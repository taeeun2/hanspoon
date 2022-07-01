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
    private long user_id;


    private boolean scope_name;
    private boolean scope_gender;
    private boolean scope_age;
    private boolean scope_company;
    private boolean scope_position;
    private boolean scope_department;

    private long capacity;
    private long category_id;
}
