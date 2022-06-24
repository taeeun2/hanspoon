package com.hansol.hanspoon.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

//작업 중
@Getter
public class PostListResponseDto {
    private Long post_id;
    private String category_name;
    //private DateTimeFormat meet_date;
    private String title;
    private String restaurant_name;
    private long capacity;
    private long participant_num;
    private String name;
    private int spoon_num;

    @Builder
    public PostListResponseDto(){

    }
}
