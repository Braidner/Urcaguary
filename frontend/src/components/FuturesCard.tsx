import {observer} from "mobx-react";
import {Card, Statistic} from "antd";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import React from "react";
import {Position} from "../model/AccountInfo";

type FuturesCardProps = {
    item: Position
}

export const FuturesCard = observer(({item}: FuturesCardProps) => {
    return (
        <Card title={`${item.symbol} x${item.leverage}`}>
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="PnL" value={item.unrealizedProfit} precision={2} valueStyle={{ color: item.unrealizedProfit < 0 ? "#cf1322" : '#3f8600' }}/>
                </Col>
                <Col offset={8} span={8}>
                    <Statistic title="ROE" value={item.unrealizedProfit} precision={2} valueStyle={{ color: item.unrealizedProfit < 0 ? "#cf1322" : '#3f8600' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Statistic title="Размер" value={item.initialMargin * item.leverage} precision={2} />
                </Col>
                <Col span={8}>
                    <Statistic title="Маржа" value={item.initialMargin} precision={2} />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Statistic title="Цена входа" value={item.entryPrice} precision={2} />
                </Col>
                <Col span={8}>
                    <Statistic title="Цена маркировки" value={item.entryPrice} />
                </Col>
            </Row>
        </Card>
    )
})