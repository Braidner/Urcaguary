package org.braidner.urca.ctrl;

import com.binance.client.RequestOptions;
import com.binance.client.SyncRequestClient;
import com.binance.client.model.trade.AccountInformation;
import com.binance.client.model.trade.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("account")
    public AccountInformation account() {
        return client.getAccountInformation();
    }
}
