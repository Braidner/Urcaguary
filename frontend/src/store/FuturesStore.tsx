import {makeAutoObservable} from "mobx";
import axios from "axios";
import {AccountInfo, Position} from "../model/AccountInfo";
import {futuresApi} from "../api/FuturesApi";


class FuturesStore {
    loading: boolean = false;
    accountInfo: AccountInfo = new AccountInfo();

    constructor() {
        makeAutoObservable(this)
    }

    get actualPositions(): Position[] {
        return this.accountInfo.positions
            .filter(value => value.entryPrice !== "0.0");
    }

    fetchAccountInfo = async (): Promise<AccountInfo> => {
        console.log(this)
        return this.accountInfo = await futuresApi.getAccountInfo();
    }
}

export const futuresStore: FuturesStore = new FuturesStore()