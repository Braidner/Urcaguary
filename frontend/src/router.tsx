import React, {FC} from 'react'
import {observer} from "mobx-react";
import {BasicLayout} from "./layouts/BasicLayout";
import {AuthLayout} from "./layouts/AuthLayout";
import {hot} from "react-hot-loader";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import {LoginPage} from "./page/LoginPage";
import {IndexPage} from "./page/IndexPage";
import {authStore} from "./store/AuthStore";
import {LoadingPage} from "./page/LoadingPage";

export default hot(module)(() => {
    return (
        <ConfigProvider componentSize="middle">
            <Router/>
        </ConfigProvider>
    );
});

const Router = () => {
    const authLayout = (
        <AuthLayout>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<Navigate to="/login" replace/>}/>
            </Routes>
        </AuthLayout>
    );
    const basicLayout = (
        <BasicLayout>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>

            </Routes>
        </BasicLayout>
    );

    return (
        <LoadingWrapper>
            <AuthCheckWrapper authComponent={authLayout} appComponent={basicLayout}/>
        </LoadingWrapper>
    )
};

const LoadingWrapper: FC = observer(({children}: any) => {
    return authStore.loading ? <LoadingPage/> : children;
});

const AuthCheckWrapper = observer(({authComponent, appComponent}: any) => {
    let component = authStore.isAuth ? appComponent : authComponent
    return <BrowserRouter>
        {component}
    </BrowserRouter>;
});
