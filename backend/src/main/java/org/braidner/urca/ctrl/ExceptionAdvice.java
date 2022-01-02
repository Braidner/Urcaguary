package org.braidner.urca.ctrl;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(Exception.class)
    public ErrorMessage serverError(Exception e) {
        log.error(e.getMessage(), e);
        return ErrorMessage.of()
                .code(100)
                .message(String.format("Ошибка на стороне сервера: %s", e.getMessage() == null ? e : e.getMessage()))
                .timestamp(new Date())
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadCredentialsException.class)
    public ErrorMessage serverError(BadCredentialsException e) {
        log.error(e.getMessage(), e);
        return ErrorMessage.of()
                .code(102)
                .message("Неправильный логин или пароль")
                .timestamp(new Date())
                .build();
    }

    @Data
    @Builder(builderMethodName = "of")
    public static class ErrorMessage {
        private int code;
        private String message;
        private Date timestamp;
    }

}
