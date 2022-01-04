import {observer} from "mobx-react";
import {Card, Statistic} from "antd";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import React from "react";
import {Position, PositionRisk} from "../model/AccountInfo";
import {Link} from "react-router-dom";

type FuturesCardProps = {
    item: PositionRisk
}

export const FuturesCard = observer(({item}: FuturesCardProps) => {
    return (
        <Card title={<Link to={`/futures/${item.symbol}`}>{item.symbol} x{item.leverage}</Link>}>
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="PnL" value={item.unrealizedProfit} precision={4} valueStyle={{ color: item.unrealizedProfit < 0 ? "#cf1322" : '#3f8600' }}/>
                </Col>
                <Col offset={8} span={8}>
                    <Statistic title="ROE" suffix="%" value={item.positionAmt * item.entryPrice / item.leverage / 100 * item.unrealizedProfit} precision={2} valueStyle={{ color: item.unrealizedProfit < 0 ? "#cf1322" : '#3f8600' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Statistic title="Размер" value={item.positionAmt * item.markPrice} precision={2} />
                </Col>
                <Col span={8}>
                    <Statistic title="Маржа" value={item.positionAmt * item.entryPrice / item.leverage} precision={2} />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Statistic title="Цена входа" value={item.entryPrice} precision={4} />
                </Col>
                <Col span={8}>
                    <Statistic title="Цена маркировки" value={item.markPrice} precision={4} />
                </Col>
            </Row>
        </Card>
    )
})