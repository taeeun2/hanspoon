package com.hansol.hanspoon.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum HanspoonErrorCode {
    INTERNAL_SERVER_ERROR("서버에 오류가 발생했습니다."),
    INVALID_REQUEST("잘못된 요청입니다."),
    NO_USER("아이디 또는 비밀번호가 일치하지 않습니다."),

    NO_EMAIL("해당 이메일이 존재하지 않습니다."),

    NO_RESTAURANT("식당이 존재하지 않습니다."),
    DUPLICATED_EMAIL("중복된 이메일이 존재합니다."),

    NO_USER_EMAIL("해당 이메일을 가진 사용자가 존재하지 않습니다."),

    NO_EMAIL_NAME("이메일 정보와 사용자 이름의 정보가 일치하지 않습니다.");

    private final String message;
}
