package com.hansol.hanspoon.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum HanspoonErrorCode {
    INTERNAL_SERVER_ERROR("서버에 오류가 발생했습니다."),
    INVALID_REQUEST("잘못된 요청입니다."),
    NO_USER("아이디 또는 비밀번호가 일치하지 않습니다.");
    private final String message;
}
