package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.*;
import com.hansol.hanspoon.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/getCurrentTime")
    public LocalDateTime getCurrentTime(){
        return LocalDateTime.now();
    }

    @PostMapping("/createPost")
    public CreatePostResponseDto createPost(@RequestBody PostRequestDto postRequestDto){
        return  postService.createPost(postRequestDto);
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

    @PostMapping("/editPost")
    public void editPost(@RequestBody EditPostRequestDto requestDto){
        postService.editPost(requestDto);
    }
}
