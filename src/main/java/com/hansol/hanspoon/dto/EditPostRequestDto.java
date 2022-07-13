package com.hansol.hanspoon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditPostRequestDto {

    private long post_id;
    private String title;
    private String content;
}
