import React, {FC} from "react";
import {observer} from "mobx-react";
import {state} from "../App";
import axios from "axios";
import {authStore} from "../store/AuthStore";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import Input from "antd/es/input";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import {Button} from "../components/Button";
import Divider from "antd/es/divider";

export const IndexPage: FC = observer(() => {
    return (
        <Row>
            <Col xs={{offset: 4, span: 16}} sm={{offset: 8, span: 8}}>
                <Space direction={"vertical"} style={{width: '100%'}}>

                    <Button style={{width: '100%'}}>
                        Hello
                    </Button>
                </Space>
            </Col>
        </Row>
    )
})