import React, {FC, useEffect} from 'react';
import './App.css';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import axios from "axios";
import {authStore} from "./store/AuthStore";
import Router from './router'

class State {
    version: string = ""

    constructor() {
        makeAutoObservable(this)
        axios.get("version").then(({data}) => {
            this.version = data;
        })
    }
}

export const state = new State();

export const App: FC = observer(() => {
    useEffect(() => {
        authStore.fetchCurrentUser()
    }, []);

    return (
        <Router/>
    )
});