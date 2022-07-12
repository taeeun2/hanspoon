package com.hansol.hanspoon.dto;

import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.type.StatePostType;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.HashMap;
import java.util.List;

@Getter
public class PostResponseDto {
    private Long post_id;
    private String title;
    private String content;
    private String restaurant_name;
    private String restaurant_address;
    private String meet_date;
    private String meet_time;
    private long capacity;
    private long participant_num;

    private Category category;
    private StatePostType state;
    private HashMap<String,Object> hostInfo;
    private List<HashMap<String,Object>> guestInfo;

    @Builder
    public PostResponseDto(Post post, Category category, HashMap<String,Object> host, List<HashMap<String,Object>> guest){
        this.post_id = post.getPost_id();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.restaurant_name = post.getRestaurant_name();
        this.restaurant_address = post.getRestaurant_address();

        java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat("yyyy년 MM월 dd일");
        java.text.SimpleDateFormat timeFormat = new java.text.SimpleDateFormat("HH시 mm분");
        this.meet_date = dateFormat.format(post.getMeet_date());
        this.meet_time = timeFormat.format(post.getMeet_date());

        this.capacity = post.getCapacity();
        this.participant_num = post.getParticipant_num();
        this.state = post.getState();

        this.category = category;
        this.hostInfo = host;
        this.guestInfo = guest;

    }
}
