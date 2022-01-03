import React, {FC} from "react";
import {observer} from "mobx-react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import {Button} from "../components/Button";

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