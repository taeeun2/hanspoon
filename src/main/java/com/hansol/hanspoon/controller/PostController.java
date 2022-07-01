package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.repository.PostRepository;
import com.hansol.hanspoon.service.PostService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/getCurrentTime")
    public LocalDateTime getCurrentTime(){
        return LocalDateTime.now();
    }

    @GetMapping("/createPost")
    public void createPost(@RequestBody PostRequestDto postRequestDto){
        postService.createPost(postRequestDto);
    }
}
