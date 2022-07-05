package com.hansol.hanspoon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostApplyRequestDto {
    private long post_id;
    private long user_id;

    private boolean scope_name;
    private boolean scope_gender;
    private boolean scope_age;
    private boolean scope_company;
    private boolean scope_position_type;
    private boolean scope_department;
}
