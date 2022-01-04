import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {futuresApi} from "../api/FuturesApi";
import {Card, Table} from "antd";
import {Trade} from "../model/Trade";

export type TradesPageType = {
   symbol: string;
}

export const TradesPage = observer(({symbol}: TradesPageType) => {
   let [trades, setTrades] = useState<Trade[]>([]);
   useEffect(() => {
      futuresApi.getTrades(symbol).then(setTrades)
   }, []);

   const columns = [
      {title: 'price', dataIndex: 'price', key: 'price'},
      {title: 'qty', dataIndex: 'qty', key: 'qty'},
      {title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty'},
      {title: 'time', dataIndex: 'time', key: 'time', render: (item: number) => item},
   ]

   return (
       <Card title={`Trades ${symbol}`}>
          <Table columns={columns} dataSource={trades} />
       </Card>
   )
});