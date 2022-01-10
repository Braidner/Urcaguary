import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {Candle} from "../model/AccountInfo";
import {makeAutoObservable} from "mobx";
import {futuresApi} from "../api/FuturesApi";
import {format} from "d3-format";
import {
    CandlestickSeries,
    Chart,
    ChartCanvas,
    CrossHairCursor,
    defaultScaleProvider,
    discontinuousTimeScaleProviderBuilder,
    DrawingObjectSelector,
    InteractiveYCoordinate,
    withSize,
    XAxis,
    YAxis
} from "react-financial-charts"
import {useElementSize} from "usehooks-ts";

export type TradingChartType = {
    symbol: string
}

export const TradingChart = observer(({symbol}: TradingChartType) => {
    let [initialData, setData] = useState<any[]>([]);

    useEffect(() => {
        futuresState.fetchCandles(symbol).then(candles => {

            setData(candles.map(candle => {
                return {
                    // time: '2018-10-22',
                    date: new Date(candle.openTime),
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close
                }
            }));
        })
    }, []);

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => {
            return d.date;
        }
    );

    const {data, xScale, xAccessor, displayXAccessor} = ScaleProvider(
        initialData
    );
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];
    const pricesDisplayFormat = format(".2f");

    const buy = {
        ...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
        stroke: "#1F9D55",
        textFill: "#1F9D55",
        text: "Buy 120",
        edge: {
            ...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
            stroke: "#1F9D55"
        }
    };

    let yCoordinateList_1 = [
        {
            ...buy,
            yValue: 42000.90,
            id: 123,
            draggable: true,
        },
    ];

    let grid = {
        gridLinesStrokeStyle: "rgba(92, 90, 92, 0.3)",
        strokeStyle: "rgba(92, 90, 92, 1)",
        tickLabelFill: "#FFFFFF"
    }

    withSize()

    const [ref, { width, height }] = useElementSize();

    return (
        <div ref={ref} className="chart-view">
            <ChartCanvas width={width} height={400}
                         ratio={3}
                         margin={{left: 50, right: 50, top: 10, bottom: 30}}
                         seriesName={symbol}
                         data={data}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xScale={xScale}
                         xExtents={xExtents}>

                <Chart id={1} yExtents={d => {
                    return [d.high, d.low];
                }}>
                    <XAxis showGridLines
                            showTicks={false} {...grid}
                    />
                    <YAxis showGridLines tickFormat={pricesDisplayFormat} showTicks={false} {...grid}/>
                    <CandlestickSeries
                    />
                    <InteractiveYCoordinate
                        // ref={this.saveInteractiveNodes("InteractiveYCoordinate", 1)}
                        enabled={true}
                        onDragComplete={e => e}
                        onChoosePosition={e => e}
                        // onDelete={this.onDelete}
                        yCoordinateList={yCoordinateList_1}
                    />
                </Chart>
                <CrossHairCursor/>
            </ChartCanvas>
        </div>
    )
});

class FuturesState {
    loading: boolean = false;
    candles: Candle[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    fetchCandles = async (symbol: string): Promise<Candle[]> => {
        return this.candles = await futuresApi.getCandlesticks(symbol);
    }
}

const futuresState = new FuturesState()