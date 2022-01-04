import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import {Button} from "../components/Button";
import {futuresStore} from "../store/FuturesStore";
import Divider from "antd/es/divider";
import {List} from "antd";
import {PositionRisk} from "../model/AccountInfo";
import {FuturesCard} from "../components/FuturesCard";

export const IndexPage: FC = observer(() => {

    useEffect(() => {
        // futuresStore.fetchTest()
    }, [])

    return (
        <Row>
            <Col xs={{offset: 4, span: 16}} sm={{offset: 2, span: 20}}>
                <Space direction={"vertical"} style={{width: '100%'}}>

                    <Button style={{width: '100%'}} onClick={futuresStore.fetchPositions}>
                        Hello
                    </Button>

                    <Divider>Данные</Divider>
                    <List
                        grid={{ gutter: 16, column: 2 }}
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
    )
})