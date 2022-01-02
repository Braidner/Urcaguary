package org.braidner.urca.config;

import lombok.Data;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("app")
public class AppConfig {

    String version = "1.0.2";
    String staticLocation = "./frontend/build/";

    @SneakyThrows
    public String getBuildNumber() {
        return IOUtils.toString(AppConfig.class.getResourceAsStream("/build_number.txt"),"UTF-8");
    }
}
