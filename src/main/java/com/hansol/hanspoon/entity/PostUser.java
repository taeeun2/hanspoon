package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.StatePostUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class PostUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long post_user_id;

    @Enumerated(EnumType.STRING)
    private StatePostUserType state;

    private boolean scope_name;
    private boolean scope_gender;
    private boolean scope_age;
    private boolean scope_company;
    private boolean scope_position;
    private boolean scope_department;

    private long user_id;
    private long post_id;

    @Builder
    public PostUser(StatePostUserType state, boolean scope_gender
            ,boolean scope_age,boolean scope_company, boolean scope_position, boolean scope_name
    ,boolean scope_department, long user_id,long post_id){
        this.state = state;
        this.scope_age = scope_age;
        this.scope_gender = scope_gender;
        this.scope_company = scope_company;
        this.scope_department = scope_department;
        this.scope_name = scope_name;
        this.user_id = user_id;
        this.post_id = post_id;
        this.scope_position = scope_position;
    }


}
