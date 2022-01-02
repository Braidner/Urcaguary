import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {computed, makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import {AuthLayout} from "./layouts/AuthLayout";
import UserOutlined from "@ant-design/icons/UserOutlined"
import LockOutlined from "@ant-design/icons/LockOutlined"
import Input from "antd/es/input";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Space from "antd/es/space";
import Divider from "antd/es/divider";
import notification from "antd/es/notification";
import Spin from "antd/es/spin";
import axios from "axios";
import {Button} from "./components/Button";

class State {
    currentUser = null;
    loading: boolean = false;

    login: string = "";
    password: string = "";
    newPassword: string = "";
    rePassword: string = "";

    version: string = ""

    constructor() {
        makeAutoObservable(this)
        axios.get("version").then(({data}) => {
            this.version = data;
        })
    }

    @computed isAuth = (): boolean => {
        return !!this.currentUser
    }

    fetchCurrentUser = async () => {
        try {
            this.loading = true;
            let result = await axios.get("api/security/user")
            this.currentUser = result.data;
        } catch (e) {
        } finally {
            this.loading = false;
        }
    }
}

export const state = new State();

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 403) {
        state.currentUser = null;
    } else if (error.response.status === 401) {
        notification.error({message: "Неправильный логин или пароль"})
        state.currentUser = null;
    } else {
        let message = error.response.data.message;
        notification.error({message})
    }
    console.log(error.response);
    return Promise.reject(error);
});

export const App: FC = observer(() => {
    useEffect(() => {
        state.fetchCurrentUser()
    }, []);

    return (
        <AuthLayout>
            {state.loading && (
                <Row>
                    <Col xs={{offset: 4, span: 16}} sm={{offset: 8, span: 8}}>
                        <Spin>
                            Загрузка...</Spin>
                    </Col>
                </Row>
            )}
            {!state.loading && state.isAuth() && <ChangePasswordPage/>}
            {!state.loading && !state.isAuth() && <LoginPage/>}
        </AuthLayout>
    )
});

const LoginPage: FC = observer(() => {
    const loginChange = (e: any) => state.login = e.target.value;
    const passwordChange = (e: any) => state.password = e.target.value;

    const login = async () => {
        // state.loading = true;
        try {
            const data = new FormData()
            data.append("username", state.login)
            data.append("password", state.password)
            let result: any = await axios({
                method: "post",
                url: "login",
                data: data,
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            });
            await state.fetchCurrentUser()
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
                    <Input prefix={<UserOutlined style={{color: '#1890ff'}}/>} placeholder={"Логин"}
                           onChange={loginChange}/>
                    <Input.Password prefix={<LockOutlined style={{color: '#1890ff'}}/>} placeholder={"Пароль"}
                                    onChange={passwordChange}/>
                    <Button type={"primary"} style={{width: '100%'}} onClick={login}>Войти</Button>
                    <Divider>Или войти через</Divider>
                    <Button style={{width: '100%'}} href="oauth2/authorization/google">
                        Google
                    </Button>
                    {/*<Button type={"primary"} style={{width: '100%'}} onClick={state.fetchCurrentUser}>Check</Button>*/}
                </Space>
            </Col>
        </Row>
    )
})

const ChangePasswordPage: FC = observer(() => {
    const oldPasswordChange = (e: any) => state.password = e.target.value;
    const newPasswordChange = (e: any) => state.newPassword = e.target.value;
    const rePasswordChange = (e: any) => state.rePassword = e.target.value;

    const changePassword = async () => {
        try {
            await axios.post('api/security/password', {
                password: state.password,
                newPassword: state.newPassword,
                rePassword: state.rePassword
            });
            notification.info({message: "Пароль успешно изменен"})
        } catch (e) {

        }
    }

    return (
        <Row>
            <Col xs={{offset: 4, span: 16}} sm={{offset: 8, span: 8}}>
                <Space direction={"vertical"} style={{width: '100%'}}>
                    <Input.Password prefix={<LockOutlined style={{color: '#1890ff'}}/>}
                                    placeholder={"Текущий пароль"}
                                    onChange={oldPasswordChange}/>
                    <Input.Password prefix={<LockOutlined style={{color: '#1890ff'}}/>} placeholder={"Новый пароль"}
                                    onChange={newPasswordChange}/>
                    <Input.Password prefix={<LockOutlined style={{color: '#1890ff'}}/>}
                                    placeholder={"Повторите пароль"}
                                    onChange={rePasswordChange}/>
                    <Button type={"primary"} style={{width: '100%'}} onClick={changePassword}>Сменить
                        пароль</Button>
                </Space>
                <Divider/>
                <Button type={"default"} style={{width: '100%'}} href={"logout"}>Выход</Button>
            </Col>
        </Row>
    )
})