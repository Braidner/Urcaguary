package org.braidner.urca;

import com.binance.client.RequestOptions;
import com.binance.client.SyncRequestClient;
import com.binance.client.model.trade.AccountInformation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class App {

    @Value("${API_KEY}")
    private String apiKey;
    @Value("${API_SECRET}")
    private String apiSecret;

    @Bean
    public SyncRequestClient syncRequestClient() {
        RequestOptions options = new RequestOptions();
        return SyncRequestClient.create(
                apiKey,
                apiSecret,
                options);
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
