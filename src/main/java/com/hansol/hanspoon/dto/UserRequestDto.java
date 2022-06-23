package com.hansol.hanspoon.dto;

import com.hansol.hanspoon.type.AgeGroup;
import com.hansol.hanspoon.type.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    private String email;
    private String password;
    private String user_name;
    private AgeGroup age;
    private Gender gender;

    private long department_id;
    private long position_type_id;
    private long company_id;
}
