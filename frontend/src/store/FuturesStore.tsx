import {makeAutoObservable} from "mobx";
import axios from "axios";
import {AccountInfo, Position, PositionRisk} from "../model/AccountInfo";
import {futuresApi} from "../api/FuturesApi";


class FuturesStore {
    loading: boolean = false;
    accountInfo: AccountInfo = new AccountInfo();
    positions: PositionRisk[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    get actualPositions(): PositionRisk[] {
        console.log(this.accountInfo.positions.filter(value => value.entryPrice !== "0.0"))
        return this.positions
            .filter(value => value.entryPrice > 0);
    }

    fetchAccountInfo = async (): Promise<AccountInfo> => {
        console.log(this)
        return this.accountInfo = await futuresApi.getAccountInfo();
    }

    fetchPositions = async (): Promise<PositionRisk[]> => {
        console.log(this)
        return this.positions = await futuresApi.getPositions();
    }
}

export const futuresStore: FuturesStore = new FuturesStore()