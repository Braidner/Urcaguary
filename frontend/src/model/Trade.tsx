export class Trade {
    id: number = 0;
    price: number = 0;
    qty: number = 0;
    quoteQty: number = 0;
    time: number = 0;
}

export class MyTrade {
    isBuyer: boolean = false;
    isMaker: boolean = false;
    commission: number = 0;
    commissionAsset: string = "";
    counterPartyId: number = 0;
    orderId: number = 0;
    price: number = 0;
    qty: number = 0;
    quoteQty: number = 0;
    realizedPnl: number = 0;
    side: string = "";
    positionSide: string = "";
    symbol: string = "";
    time = 0;
}