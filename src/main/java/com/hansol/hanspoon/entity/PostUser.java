package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.StatePostUserType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
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


}
