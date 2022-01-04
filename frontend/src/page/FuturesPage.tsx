import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react";
import {FuturesCard} from "../components/FuturesCard";
import {useParams} from "react-router-dom";
import {futuresStore} from "../store/FuturesStore";
import {LoadingPage} from "./LoadingPage";
import {BarData, createChart, CrosshairMode, IChartApi} from "lightweight-charts";
import {makeAutoObservable} from "mobx";
import {futuresApi} from "../api/FuturesApi";
import {Candle} from "../model/AccountInfo";
import {Col, Row} from "antd";


export const FuturesPage = observer(() => {
    let {symbol} = useParams<{symbol: string}>();

    useEffect(() => {
        futuresStore.fetchAccountInfo()
    }, []);

    let position = futuresStore.actualPositions
        .find(value => value.symbol === symbol);

    if (futuresStore.loading || !position || !symbol) {
        return <LoadingPage/>
    }

    return (
        <Row gutter={16}>
            <Col span={12}>
                <TradingView symbol={symbol}/>
            </Col>
            <Col span={12}>
                <FuturesCard item={position}/>
            </Col>
        </Row>
    );
});

type TradingViewType = {
    symbol: string;
}

const TradingView = observer(({symbol}: TradingViewType) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chart = useRef<IChartApi>();

    useEffect(() => {
        let current = chartContainerRef.current;
        if (!current) {
            return;
        }
        chart.current = createChart(current, {
            width: current.clientWidth,
            height: 500,
            layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                    color: '#334158',
                },
                horzLines: {
                    color: '#334158',
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            // priceScale: {
            //     borderColor: '#485c7b',
            // },
            // timeScale: {
            //     borderColor: '#485c7b',
            // },
        });

        const candleSeries = chart.current?.addCandlestickSeries({
            upColor: '#4bffb5',
            downColor: '#ff4976',
            borderDownColor: '#ff4976',
            borderUpColor: '#4bffb5',
            wickDownColor: '#838ca1',
            wickUpColor: '#838ca1',
        });

        futuresState.fetchCandles(symbol).then(candles=> {

            candleSeries?.setData(candles.map(candle => {
                return {
                    // time: '2018-10-22',
                    time: candle.openTime,
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close
                } as BarData
            }));
        })

    }, []);

    const resizeObserver = useRef<ResizeObserver>();
    useEffect(() => {
        resizeObserver.current = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            chart.current?.applyOptions({ width, height });
            setTimeout(() => {
                chart.current?.timeScale().fitContent();
            }, 0);
        });

        if (!!chartContainerRef.current) {
            resizeObserver.current?.observe(chartContainerRef.current!);
        }

        return () => resizeObserver.current?.disconnect();
    }, []);

    return (
        <div ref={chartContainerRef} className="chart-container" />
    );
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
