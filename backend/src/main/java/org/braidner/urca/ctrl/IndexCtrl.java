package org.braidner.urca.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.braidner.urca.config.AppConfig;

@Controller
@RequestMapping()
public class IndexCtrl {

    @Autowired
    private AppConfig appConfig;

    @Autowired
    private Environment environment;

    @GetMapping("version")
    @ResponseBody
    public String version() {
        if (environment.acceptsProfiles(Profiles.of("development"))) {
            return "1.0.0" + "#build." + appConfig.getBuildNumber();
        }
        return "1.0.0";
    }

    @GetMapping({"/", "/login"})
    public String welcome() {
        return "forward:/index.html";
    }
}
