package com.hansol.hanspoon.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public class PostRequestDto {
    private String title;
    private String content;
    private String restaurant_name;
    private Timestamp meet_date;

    private long capacity;
    private long category_id;
}
