package com.hansol.hanspoon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostResponseDto {
    private Long post_id;
    private String errorMessage;
}
