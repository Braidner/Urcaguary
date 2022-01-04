import {AccountInfo} from "../model/AccountInfo";
import axios from "axios";

class FuturesApi {
    async getAccountInfo(): Promise<AccountInfo> {
        let response = await axios.get("api/binance/futures/account");
        console.log(response.data)
        return response.data
    }
}
export const futuresApi: FuturesApi = new FuturesApi()