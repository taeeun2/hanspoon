package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.StatePostType;
import com.hansol.hanspoon.type.StateUserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long post_id;

    private String title;
    private String content;
    private String restaurant_name;


   private Timestamp meet_date;

    private long capacity;
    private long participant_num;

    @Enumerated(EnumType.STRING)
    private StatePostType state;


    @CreatedDate
    private Timestamp create_date;
    @LastModifiedDate
    private Timestamp update_date;

    private long category_id;

}
