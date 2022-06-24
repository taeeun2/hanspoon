package com.hansol.hanspoon.exception;

import lombok.Getter;

@Getter
public class HanspoonException extends RuntimeException{
    private HanspoonErrorCode hanspoonErrorCode;
    private String detailMessage;

    //기본 에러 메시지
    public HanspoonException(HanspoonErrorCode hanspoonErrorCode){
        super(hanspoonErrorCode.getMessage());//RuntimeException에 담아줄 데이터를 넣어줌
        this.hanspoonErrorCode = hanspoonErrorCode;
        this.detailMessage = hanspoonErrorCode.getMessage();
    }

    //디테일 메시지
    public HanspoonException(HanspoonErrorCode practicalErrorCode, String detailMessage){
        super(detailMessage);//RuntimeException에 담아줄 데이터를 넣어줌
        this.hanspoonErrorCode = practicalErrorCode;
        this.detailMessage = detailMessage;
    }
}
