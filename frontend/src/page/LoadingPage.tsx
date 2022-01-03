import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Spin from "antd/es/spin";
import React, {FC} from "react";
import {observer} from "mobx-react";

export const LoadingPage: FC = observer(() => {
        return (
            <Row>
                <Col xs={{offset: 4, span: 16}} sm={{offset: 8, span: 8}}>
                    <Spin>Загрузка...</Spin>
                </Col>
            </Row>
        )
    })

