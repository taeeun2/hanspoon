package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.AgeGroup;
import com.hansol.hanspoon.type.Gender;
import com.hansol.hanspoon.type.StateUserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    private String user_name;
    private String email;
    private String password;

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
