package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.AgeGroup;
import com.hansol.hanspoon.type.Gender;
import com.hansol.hanspoon.type.StateUserType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    private String user_name;
    private String email;
    private String password;

    @Builder
    public User(String email, String password, String user_name, AgeGroup age, Gender gender, long department_id,long position_type_id, long company_id ) {
        this.email = email;
        this.password = password;
        this.user_name = user_name;
        this.age = age;
        this.gender = gender;

        this.department_id = department_id;
        this.position_type_id = position_type_id;
        this.company_id = company_id;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }


    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        // 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금되었는지 확인하는 로직
        return true; // true -> 잠금되지 않았음
    }

    // 패스워드의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드가 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        // 계정이 사용 가능한지 확인하는 로직
        return true; // true -> 사용 가능
    }
}
