package org.braidner.urca.ctrl;

import com.binance.client.SyncRequestClient;
import com.binance.client.model.enums.CandlestickInterval;
import com.binance.client.model.market.Candlestick;
import com.binance.client.model.market.ExchangeInformation;
import com.binance.client.model.trade.AccountInformation;
import com.binance.client.model.trade.MyTrade;
import com.binance.client.model.trade.PositionRisk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/binance/futures")
public class BinanceFuturesCtrl {

    @Autowired
    private SyncRequestClient client;

    @GetMapping("candlestick/{symbol}")
    public List<Candlestick> candlesticks(@PathVariable String symbol) {
        return client.getCandlestick(symbol, CandlestickInterval.FOUR_HOURLY, null, null, 500);
    }

    @GetMapping("trades/{symbol}")
    public List<MyTrade> trades(@PathVariable String symbol, @RequestParam(required = false) Long fromId) {
        return client.getAccountTrades(symbol, null, null, fromId, 100);
    }

    @GetMapping("positions")
    public List<PositionRisk> positions() {
        return client.getPositionRisk().stream()
                .filter(value -> value.getPositionAmt().compareTo(BigDecimal.ZERO) > 0)
                .collect(Collectors.toList());
    }

    @GetMapping("exchange")
    public ExchangeInformation exchange() {
        return client.getExchangeInformation();
    }

    @GetMapping("account")
    public AccountInformation account() {
        AccountInformation information = client.getAccountInformation();
        information.getPositions().removeIf(position -> position.getEntryPrice().equals("0.0"));
        return information;
    }
}
