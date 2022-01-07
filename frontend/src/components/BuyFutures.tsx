import {observer} from "mobx-react";
import {Card, Form, Input, Select} from "antd";
import React from "react";
import {PositionRisk} from "../model/AccountInfo";
import {Button} from "./Button";

type BuyFuturesProps = {
    item: PositionRisk
}

export const BuyFutures = observer(({item}: BuyFuturesProps) => {
    const [form] = Form.useForm();
    return (
        <Card title="Купить">
            <Form form={form} layout="vertical" initialValues={{price: item.markPrice, type: 'LIMIT'}}>
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
    )
})