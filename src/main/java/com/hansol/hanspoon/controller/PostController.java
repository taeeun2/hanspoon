package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.PostApplyRequestDto;
import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.repository.PostRepository;
import com.hansol.hanspoon.service.PostService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/getCurrentTime")
    public LocalDateTime getCurrentTime(){
        return LocalDateTime.now();
    }

    @PostMapping("/createPost")
    public void createPost(@RequestBody PostRequestDto postRequestDto){
        postService.createPost(postRequestDto);
    }

    @GetMapping("/post/detail/{post_id}")
    public ResponseEntity<PostResponseDto> getPostDetail(@PathVariable long post_id){
        return new ResponseEntity<>(postService.getPostDetail(post_id), HttpStatus.OK);
    }

    @PostMapping("/applyPost")
    public void applyPost(@RequestBody PostApplyRequestDto postApplyRequestDto){
        postService.applyPost(postApplyRequestDto);
    }

    @GetMapping("/deletePost/{post_id}")
    public void  deletePost(@PathVariable long post_id){
        postService.deletePost(post_id);
    }

    @GetMapping("cancelApply/{post_id}")
    public void cancelApply(@PathVariable long post_id,@RequestParam(value = "user") long user_id){
        postService.cancelApply(post_id, user_id);
    }
}
