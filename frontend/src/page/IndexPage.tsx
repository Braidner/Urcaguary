import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import {Button} from "../components/Button";
import {futuresStore} from "../store/FuturesStore";
import Divider from "antd/es/divider";
import {List, PageHeader, Statistic, Tag} from "antd";
import {PositionRisk} from "../model/AccountInfo";
import {FuturesCard} from "../components/FuturesCard";
import {ProfitStatistic} from "../components/ProfitStatistic";

export const IndexPage: FC = observer(() => {

    useEffect(() => {
        // futuresStore.fetchTest()
    }, [])

    return (
        <>
            <PageHeader
                title="Портфель фьючерсов"
                ghost={false}
                extra={[
                    <Button key="1" type="primary" onClick={async () => {
                        await Promise.all([
                            await futuresStore.fetchPositions(),
                            await futuresStore.fetchAccountInfo()
                        ])
                    }}>
                        Обновить
                    </Button>,
                ]}
            >
                <Row>
                    <ProfitStatistic
                        title="PnL"
                        prefix="$"
                        precision={2}
                        value={futuresStore.accountInfo.totalUnrealizedProfit}
                        style={{
                            margin: '0 32px',
                        }}
                    />
                    <Statistic
                        title="Маржа"
                        prefix="$"
                        precision={0}
                        value={futuresStore.accountInfo.totalMarginBalance}
                    />
                    <Statistic title="Баланс" prefix="$" precision={0}
                               value={futuresStore.accountInfo.totalWalletBalance}
                               style={{
                                   margin: '0 32px',
                               }}/>
                </Row>
            </PageHeader>
            <Row>
                <Col xs={{offset: 4, span: 16}} sm={{offset: 2, span: 20}}>
                    <Space direction={"vertical"}>
                        <List
                            grid={{ gutter: 16, column: 2 , xs: 1, sm: 1, md: 2}}
                            dataSource={futuresStore.actualPositions}
                            renderItem={(item: PositionRisk) => (
                                <List.Item>
                                    <FuturesCard item={item}/>
                                </List.Item>
                            )}
                        />
                    </Space>
                </Col>
            </Row>
        </>
    )
})