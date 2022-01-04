export class AccountInfo {
    marginBalance: number = 0;
    unrealizedProfit: number = 0;
    walletBalance: number = 0;
    positions: Position[] = []
}

export class Position {
    symbol: string = "";
    entryPrice: string = "";
    //плечо
    leverage: number = 0;
    //маржа
    initialMargin: number = 0;
    positionSide: "LONG" | "SHORT" = "LONG"
    unrealizedProfit: number = 0;
}

export class PositionRisk {
    entryPrice: number = 0
    leverage: number = 0
    maxNotionalValue: number = 0
    liquidationPrice: number = 0
    markPrice: number = 0
    positionAmt: number = 0
    unrealizedProfit: number = 0
    symbol: string = ""
    isolatedMargin: string = ""
    positionSide: string = ""
    marginType: string = ""
}

export class Candle {
    openTime: number = 0;
    open: number = 0;
    high: number = 0;
    low: number = 0;
    close: number = 0;
    volume: number = 0;
    closeTime: number = 0;
}