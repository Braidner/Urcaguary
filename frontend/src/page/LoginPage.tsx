import React, {FC} from "react";
import {observer} from "mobx-react";
import axios from "axios";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import Input from "antd/es/input";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import {Button} from "../components/Button";
import Divider from "antd/es/divider";
import {state} from "../App";
import {authStore} from "../store/AuthStore";
import {makeAutoObservable} from "mobx";

class LoginPageState {
    login: string = "";
    password: string = "";

    constructor() {
        makeAutoObservable(this)
    }
}

const loginPageState = new LoginPageState()

export const LoginPage: FC = observer(() => {
    const loginChange = (e: any) => loginPageState.login = e.target.value;
    const passwordChange = (e: any) => loginPageState.password = e.target.value;

    const login = async () => {
        // state.loading = true;
        try {
            const data = new FormData()
            data.append("username", loginPageState.login)
            data.append("password", loginPageState.password)
            await axios({
                method: "post",
                url: "login",
                data: data,
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            });
            await authStore.fetchCurrentUser()
            window.history.pushState('', 'ЛК ЦР', '/');
            // window.location.reload()
        } finally {
            // state.loading = false;
        }
    }

    return (
        <Row>
            <Col xs={{offset: 4, span: 16}} sm={{offset: 8, span: 8}}>
                <Space direction={"vertical"} style={{width: '100%'}}>
                    <Input prefix={<UserOutlined style={{color: '#1890ff'}}/>} placeholder={"Логин"} value={loginPageState.login}
                           onChange={loginChange}/>
                    <Input.Password prefix={<LockOutlined style={{color: '#1890ff'}}/>} placeholder={"Пароль"} value={loginPageState.password}
                                    onChange={passwordChange}/>
                    <Button type={"primary"} style={{width: '100%'}} onClick={login}>Войти</Button>
                    <Divider>Или войти через</Divider>
                    <Button style={{width: '100%'}} href="oauth2/authorization/google">
                        Google
                    </Button>
                </Space>
            </Col>
        </Row>
    )
})
