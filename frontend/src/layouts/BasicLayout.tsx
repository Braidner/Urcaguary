import React from "react";
import Layout from "antd/es/layout";
import {Link} from "react-router-dom";
import logo from './logo.svg';
import user from './user.svg';
import Dropdown from "antd/es/dropdown";
import Space from "antd/es/space";
import Menu from "antd/es/menu";
import UserOutlined from "@ant-design/icons/UserOutlined";
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined";
import {Button} from "../components/Button";
import {authStore} from "../store/AuthStore";

const {Header, Content, Footer} = Layout;

export const BasicLayout = ({children}: any) => {
    return (
        <Layout>
            <Layout>
                <HeaderBar/>
                <Content>{children}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}

const HeaderBar = () => {
    return (
        <Header style={{padding: "0 24px", display: "flex", justifyContent: 'space-between'}}>
            <div className="header-logo">
                <Link to={'/'}>
                    <img src={logo} alt="logo"/>
                    <h1>Urcaguary <span style={{fontSize: '10px', marginLeft: '-4px'}}>from Braidner</span></h1>
                </Link>
            </div>
            <Space>
                <Dropdown className="header-right-menu" overlay={() => {
                    return (
                        <Menu style={{width: '150px'}}>
                            <Menu.Item icon={<UserOutlined/>} key="logout">
                                Выйти
                            </Menu.Item>
                        </Menu>
                    )
                }}>
                    <Space>
                        <img src={user} alt="user"/>
                        <span className="anticon">{authStore.currentUser?.username}</span>
                    </Space>
                </Dropdown>
                <Button type={'text'} icon={<QuestionCircleOutlined/>}/>
            </Space>
        </Header>
    )
}
