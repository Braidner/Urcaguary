package org.braidner.urca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationEntryPointFailureHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(
                            "/static/**",
                            "/error",
                            "/manifest.json",
                            "/robots.txt",
                            "/asset-manifest.json",
                            "/background-auth-dark.svg",
                            "/version",
                            "/favicon.ico",
                            "/logo192.png",
                            "/api/security/user"
                    ).permitAll()
                    .anyRequest().authenticated()
                    .and()
                .csrf(c -> c.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .formLogin()
                    .loginPage("/login")
                    .failureHandler(new AuthenticationEntryPointFailureHandler(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                    .permitAll()
                    .and()
                .oauth2Login()
                    .loginPage("/login-oauth")
                    .permitAll();

        http.csrf().disable();
        http.headers().cacheControl().disable();
        http.headers().frameOptions().disable();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // ALTHOUGH THIS SEEMS LIKE USELESS CODE,
        // IT'S REQUIRED TO PREVENT SPRING BOOT AUTO-CONFIGURATION
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
//                .passwordEncoder(new )
                .withUser("root").password("{noop}123").authorities("ADMIN");
    }
}
