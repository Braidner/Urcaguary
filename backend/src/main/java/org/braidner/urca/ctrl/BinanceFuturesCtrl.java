package org.braidner.urca.ctrl;

import com.binance.client.RequestOptions;
import com.binance.client.SyncRequestClient;
import com.binance.client.model.trade.Order;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/binance/futures")
public class BinanceFuturesCtrl {

    @GetMapping
    public List<Order> test() {
        RequestOptions options = new RequestOptions();
        SyncRequestClient syncRequestClient = SyncRequestClient.create("PrivateConfig.API_KEY", "PrivateConfig.SECRET_KEY",
                options);
        return syncRequestClient.getAllOrders("BTCUSDT", null, null, null, 10);
    }
}
