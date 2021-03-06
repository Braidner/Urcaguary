import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {futuresApi} from "../api/FuturesApi";
import {Card, Table} from "antd";
import {MyTrade} from "../model/Trade";
import {ColumnsType} from "antd/es/table";

export type TradesPageType = {
   symbol: string;
}

export const TradesPage = observer(({symbol}: TradesPageType) => {
   let [trades, setTrades] = useState<any[]>([]);
   useEffect(() => {
      futuresApi.getTrades(symbol).then(setTrades)
   }, []);

   const columns: ColumnsType<MyTrade> = [
      // {title: 'isBuyer', dataIndex: 'isBuyer', key: 'isBuyer'},
      // {title: 'isMaker', dataIndex: 'isMaker', key: 'isMaker'},
      {title: 'commission', dataIndex: 'commission', key: 'commission'},
      {title: 'commissionAsset', dataIndex: 'commissionAsset', key: 'commissionAsset'},
      // {title: 'counterPartyId', dataIndex: 'counterPartyId', key: 'counterPartyId'},
      {title: 'orderId', dataIndex: 'orderId', key: 'orderId'},
      {title: 'price', dataIndex: 'price', key: 'price'},
      {title: 'qty', dataIndex: 'qty', key: 'qty'},
      // {title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty'},
      {title: 'realizedPnl', dataIndex: 'realizedPnl', key: 'realizedPnl'},
      {title: 'side', dataIndex: 'side', key: 'side'},
      {title: 'positionSide', dataIndex: 'positionSide', key: 'positionSide'},
      // {title: 'symbol', dataIndex: 'symbol', key: 'symbol'},
      {title: 'time', dataIndex: 'time', key: 'time', render: (item: number) => new Date(item).toISOString()},
   ]

   return (
       <Card title={`Trades ${symbol}`}>
          <Table dataSource={trades} columns={columns}/>
       </Card>
   )
});