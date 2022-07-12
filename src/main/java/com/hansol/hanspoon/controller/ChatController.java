package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.MessageConversionException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class ChatController {

//    @MessageMapping("/hello")
//    @SendTo("/topic/roomId")
//    public Message boradCast(Map map){
//        return new Message(map.get("username").toString(),map.get("content").toString(),new Date());
//    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{room}")
    public void boradCast(Map map){
        Message message = new Message(map.get("room").hashCode(),map.get("username").toString(),map.get("content").toString(),new Date());
        simpMessagingTemplate.convertAndSend("/topic/" + map.get("room") ,message);
    }
}