package com.hansol.hanspoon.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Message {

    private long roomId;
    private String username;
    private String content;
    private Date date;

    public Message(long roomId, String username, String content, Date date) {
        this.roomId = roomId;
        this.username = username;
        this.content = content;
        this.date = date;
    }
}
