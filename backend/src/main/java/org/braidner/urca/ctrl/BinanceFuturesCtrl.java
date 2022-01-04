package org.braidner.urca.ctrl;

import com.binance.client.SyncRequestClient;
import com.binance.client.model.enums.CandlestickInterval;
import com.binance.client.model.market.Candlestick;
import com.binance.client.model.market.ExchangeInformation;
import com.binance.client.model.market.Trade;
import com.binance.client.model.trade.AccountInformation;
import com.binance.client.model.trade.Order;
import com.binance.client.model.trade.PositionRisk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/binance/futures")
public class BinanceFuturesCtrl {

    @Autowired
    private SyncRequestClient client;

    @GetMapping
    public List<Order> test() {
        return client.getAllOrders("LINAUSDT", null, null, null, 10);
    }

    @GetMapping("candlestick/{symbol}")
    public List<Candlestick> candlesticks(@PathVariable String symbol) {
        return client.getCandlestick(symbol, CandlestickInterval.FOUR_HOURLY, null, null, 100);
    }

    @GetMapping("trades/{symbol}")
    public List<Trade> trades(@PathVariable String symbol) {
        return client.getRecentTrades(symbol, 100);
    }

    @GetMapping("positions")
    public List<PositionRisk> positions() {
        return client.getPositionRisk();
    }

    @GetMapping("exchange")
    public ExchangeInformation exchange() {
        return client.getExchangeInformation();
    }

    @GetMapping("account")
    public AccountInformation account() {
        return client.getAccountInformation();
    }
}
