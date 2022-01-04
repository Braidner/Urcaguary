import {AccountInfo, Candle, PositionRisk} from "../model/AccountInfo";
import axios from "axios";

class FuturesApi {
    async getAccountInfo(): Promise<AccountInfo> {
        let response = await axios.get("/api/binance/futures/account");
        console.log(response.data)
        return response.data
    }

    async getCandlesticks(symbol: string): Promise<Candle[]> {
        let response = await axios.get(`/api/binance/futures/candlestick/${symbol}`);
        console.log(response.data)
        return response.data
    }

    async getPositions(): Promise<PositionRisk[]> {
        let response = await axios.get("/api/binance/futures/positions");
        console.log(response.data)
        return response.data
    }
}
export const futuresApi: FuturesApi = new FuturesApi()