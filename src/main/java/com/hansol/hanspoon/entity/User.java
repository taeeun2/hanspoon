package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.type.AgeGroup;
import com.hansol.hanspoon.type.Gender;
import com.hansol.hanspoon.type.StateUserType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    private String user_name;
    private String email;
    private String password;

    @Builder
    public User(String email, String password, String user_name, AgeGroup age, Gender gender, StateUserType state, long department_id,long position_type_id, long company_id ) {
        this.email = email;
        this.password = password;
        this.user_name = user_name;
        this.age = age;
        this.gender = gender;
        this.state = state;

        this.department_id = department_id;
        this.position_type_id = position_type_id;
        this.company_id = company_id;
    }

    public void editUser(UserRequestDto requestDto){
        this.password = requestDto.getPassword();
        this.user_name = requestDto.getUser_name();
        this.age = requestDto.getAge();
        this.gender = requestDto.getGender();

        this.department_id = requestDto.getDepartment_id();
        this.position_type_id = requestDto.getPosition_type_id();
        this.company_id = requestDto.getCompany_id();
        this.update_date = new Timestamp(System.currentTimeMillis());
    }

    public void setPassword(String password){
        this.password = password;
    }
    @Enumerated(EnumType.STRING)
    private AgeGroup age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private long spoon_num;
    @Enumerated(EnumType.STRING)
    private StateUserType state;

    @CreatedDate
    private Timestamp create_date;
    @LastModifiedDate
    private Timestamp update_date;

    private long department_id;
    private long position_type_id;
    private long company_id;


}