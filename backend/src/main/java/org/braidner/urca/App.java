package org.braidner.urca;

import com.binance.client.RequestOptions;
import com.binance.client.SyncRequestClient;
import lombok.extern.slf4j.Slf4j;
import org.braidner.urca.entity.BinanceKey;
import org.braidner.urca.repository.BinanceKeyRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.context.WebApplicationContext;

@Slf4j
@SpringBootApplication
public class App {

    @Bean
    @Scope(scopeName = WebApplicationContext.SCOPE_SESSION)
    public SyncRequestClient syncRequestClient(BinanceKeyRepository keyRepository) {
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User principal = (User) authentication.getPrincipal();

        BinanceKey binanceKey = keyRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("Failed to find binance key"));

        RequestOptions options = new RequestOptions();
        return SyncRequestClient.create(
                binanceKey.getKey(),
                binanceKey.getSecret(),
                options);
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
