package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.ChartDataDto;
import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.entity.ChartDataInterface;
import com.hansol.hanspoon.service.CategoryService;
import com.hansol.hanspoon.service.PostService;
import com.hansol.hanspoon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
public class MainController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping("/update")
    public void updatePostAndSpoon(){
        postService.updatePostAndSpoon();
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getCategoryList(){
        return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
    }

    @GetMapping("/post/all/{category_id}")
    public ResponseEntity<List<PostResponseDto>> getAllPostList(@PathVariable long category_id) {
        if(category_id == 0){
            return new ResponseEntity<>(postService.getAllPostList(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(postService.getAllPostListByCategory(category_id),HttpStatus.OK);
        }
    }

    @GetMapping("/post/valid/{category_id}")
    public ResponseEntity<List<PostResponseDto>> getValidPostList(@PathVariable long category_id) {
        if(category_id == 0) {
            return new ResponseEntity<>(postService.getValidPostList(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(postService.getValidPostListByCategory(category_id), HttpStatus.OK);
        }
    }

    @GetMapping("/chart/{tab_id}")
    public ResponseEntity<List<ChartDataDto>> getChartData(@PathVariable long tab_id) {
        return new ResponseEntity<>(userService.getChartData(tab_id), HttpStatus.OK);
    }
}
