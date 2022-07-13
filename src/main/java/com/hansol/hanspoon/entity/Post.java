package com.hansol.hanspoon.entity;

import com.hansol.hanspoon.type.StatePostType;
import com.hansol.hanspoon.type.StateUserType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long post_id;

    private String title;
    private String content;
    private String restaurant_name;

    private String restaurant_address;
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

    @Builder
    public Post(String title, String content, String restaurant_name, String restaurant_address, Timestamp meet_date, long capacity, long category_id, StatePostType state, long participant_num){
        this.title = title;
        this.content = content;
        this.restaurant_name = restaurant_name;
        this.restaurant_address = restaurant_address;
        this.meet_date = meet_date;
        this.capacity = capacity;
        this.category_id = category_id;
        this.state = state;
        this.participant_num = participant_num;
    }

    public void increaseParticipantNum() {
        this.participant_num++;
    }

    public void setStatusFull(){
        this.state = StatePostType.FULL;
    }

    public void setStatusValid(){
        this.state = StatePostType.VALID;
    }

    public void setStatusExpired() { this.state = StatePostType.EXPIRED; }

    public void decreaseParticipantNum() {
        this.participant_num--;
    }

    public void updateToDeleted() {
        this.state = StatePostType.DELETED;
    }

    public void editPost(String title, String content){
        this.title = title;
        this.content = content;
    }
}
