package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.PostRequestDto;
import org.apache.tomcat.jni.Local;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class PostController {

    @GetMapping("/getCurrentTime")
    public LocalDateTime getCurrentTime(){
        return LocalDateTime.now();
    }

    @GetMapping("/createPost")
    public void createPost(@RequestBody PostRequestDto postRequestDto){

    }
}
