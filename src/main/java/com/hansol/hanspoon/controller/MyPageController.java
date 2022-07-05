package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.service.PostService;
import com.hansol.hanspoon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MyPageController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

//    @GetMapping("/mypage/user")
//    public ResponseEntity<Long> getUserId(@RequestParam(value = "email") String email){
//        return new ResponseEntity<>(userService.getUserIdByName(email), HttpStatus.OK);
//    }

    @GetMapping("/mypage/{category_id}")
    public ResponseEntity<List<PostResponseDto>> getMyPostList(@PathVariable long category_id
                                                , @RequestParam(value = "user") long userId){
        if(category_id == 0){ // 신청 내역
            return new ResponseEntity<>(postService.getMyApplyPostList(userId), HttpStatus.OK);
        }
        else if(category_id == 1){ //지난 모임
            return new ResponseEntity<>(postService.getMyLastPostList(userId), HttpStatus.OK);
        }
        else if (category_id == 2) { //작성 이력
            return new ResponseEntity<>(postService.getMyRecruitPostList(userId), HttpStatus.OK);
        }
        return null; //임시
    }
}
