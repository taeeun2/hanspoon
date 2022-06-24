package com.hansol.hanspoon.exception;

import com.hansol.hanspoon.dto.HanspoonErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.INTERNAL_SERVER_ERROR;
import static com.hansol.hanspoon.exception.HanspoonErrorCode.INVALID_REQUEST;

@Slf4j
@RestControllerAdvice
public class HanspoonExceptionHandler {
    @ExceptionHandler(HanspoonException.class)
    public HanspoonErrorResponse handleException(HanspoonException e, HttpServletRequest request){
        log.error("errorCode : {}, url : {}, message : {}",
               e.getHanspoonErrorCode(),request.getRequestURL(), e.getDetailMessage());
        return HanspoonErrorResponse.builder()
                .errorCode(e.getHanspoonErrorCode())
                .errorMessage(e.getDetailMessage())
                .build();
    }

    @ExceptionHandler(value = {
            HttpRequestMethodNotSupportedException.class,
            MethodArgumentNotValidException.class
    })
    public HanspoonErrorResponse handleBadRequest(Exception e,HttpServletRequest request){
        log.error("url : {}, message : {}",
                request.getRequestURL(), e.getMessage());
        return HanspoonErrorResponse.builder()
                .errorCode(INVALID_REQUEST)
                .errorMessage(INVALID_REQUEST.getMessage())
                .build();
    }

    @ExceptionHandler(Exception.class)
    public HanspoonErrorResponse handleException(Exception e, HttpServletRequest request){
        log.error("url : {}, message : {}",
                request.getRequestURL(), e.getMessage());

        return HanspoonErrorResponse.builder()
                .errorCode(INTERNAL_SERVER_ERROR)
                .errorMessage(INTERNAL_SERVER_ERROR.getMessage())
                .build();

    }
}
