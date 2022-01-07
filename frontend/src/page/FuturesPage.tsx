import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react";
import {FuturesCard} from "../components/FuturesCard";
import {useParams} from "react-router-dom";
import {futuresStore} from "../store/FuturesStore";
import {LoadingPage} from "./LoadingPage";
import {BarData, createChart, CrosshairMode, IChartApi, LineStyle, PriceLineOptions} from "lightweight-charts";
import {makeAutoObservable} from "mobx";
import {futuresApi} from "../api/FuturesApi";
import {Candle} from "../model/AccountInfo";
import {Card, Col, Form, Input, Row, Select} from "antd";
import {TradesPage} from "../components/TradesPage";
import {BuyFutures} from "../components/BuyFutures";
import {Button} from "../components/Button";


export const FuturesPage = observer(() => {
    let {symbol} = useParams<{symbol: string}>();

    useEffect(() => {
        futuresStore.fetchAccountInfo();
        futuresStore.fetchPositions();
    }, []);

    let position = futuresStore.actualPositions
        .find(value => value.symbol === symbol);

    if (futuresStore.loading || !position || !symbol) {
        return <LoadingPage/>
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <TradingView symbol={symbol}/>
                </Col>
                <Col span={8}>
                    <FuturesCard item={position}/>
                </Col>
                <Col span={8}>
                    <BuyFutures item={position}/>
                </Col>
                <Col span={24}>
                    <TradesPage symbol={symbol}/>
                </Col>
            </Row>
        </>
    );
});

type TradingViewType = {
    symbol: string;
}
export const TradingViewStore = () => {

}

const TradingView = observer(({symbol}: TradingViewType) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chart = useRef<IChartApi>();

    useEffect(() => {
        let current = chartContainerRef.current;
        if (!current) {
            return;
        }
        let newChart = chart.current = createChart(current, {
            width: current.clientWidth,
            height: 300,
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

        const candleSeries = newChart.addCandlestickSeries({
            upColor: '#4bffb5',
            downColor: '#ff4976',
            borderDownColor: '#ff4976',
            borderUpColor: '#4bffb5',
            wickDownColor: '#838ca1',
            wickUpColor: '#838ca1',
        });

        let series = newChart.addLineSeries({
            color: 'rgb(0, 120, 255)',
            lineWidth: 2,
            crosshairMarkerVisible: false,
            lastValueVisible: false,
            priceLineVisible: false,
        });

        let maxPriceLine: PriceLineOptions = {
            price: 100,
            color: '#be1238',
            lineWidth: 2,
            lineStyle: LineStyle.Solid,
            axisLabelVisible: true,
            title: 'maximum price',
        }

        series.createPriceLine(maxPriceLine)

        candleSeries?.applyOptions({
            priceFormat: {
                type: 'price',
                precision: 6,
                minMove: 0.000001,
            },
        })

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

    const [form] = Form.useForm();

    return (
        <Row>
            <Col span={16}>
                <div ref={chartContainerRef} className="chart-container" />
            </Col>
            <Col span={8}>

            </Col>
            <Card title="Купить">
                <Form form={form} layout="vertical" initialValues={{price: 0, type: 'LIMIT'}}>
                    <Form.Item name="type" label="" colon={false}>
                        <Select>
                            <Select.Option value="LIMIT">Лимитный</Select.Option>
                            <Select.Option value="MARKET">Рыночный</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Цена" name="price">
                        <Input placeholder="Цена"/>
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button type="default" htmlType="button">
                            Добавить ведро
                        </Button>
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button type="default" htmlType="button">
                            Разместить сделку
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
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
