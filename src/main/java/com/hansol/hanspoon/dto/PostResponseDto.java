package com.hansol.hanspoon.dto;

import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.type.StatePostType;
import lombok.Builder;
import lombok.Getter;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

@Getter
public class PostResponseDto {
    private Long post_id;
    private String title;
    private String content;
    private String restaurant_name;
    private Timestamp meet_date;
    private long capacity;
    private long participant_num;

    private String category_name;
    private StatePostType state;
    private HashMap<String,String> hostInfo;
    private List<HashMap<String,String>> guestInfo;

    @Builder
    public PostResponseDto(Post post, String category_name, HashMap<String,String> host, List<HashMap<String,String>> guest){
        this.post_id = post.getPost_id();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.restaurant_name = post.getRestaurant_name();
        this.meet_date = post.getMeet_date();
        this.capacity = post.getCapacity();
        this.participant_num = post.getParticipant_num();
        this.state = post.getState();

        this.category_name = category_name;
        this.hostInfo = host;
        this.guestInfo = guest;
    }
}
