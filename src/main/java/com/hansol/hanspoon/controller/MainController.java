package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.service.CategoryService;
import com.hansol.hanspoon.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/main")
@CrossOrigin
public class MainController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PostService postService;

//    @GetMapping("/")
//    public ResponseEntity<List<Category>> main(){
//        return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
//    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getCategoryList(){
        return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
    }

//    @CrossOrigin("*")
//    @GetMapping("/post/list")
//    public ResponseEntity<List<Post>> getAllPostList() {
//        return new ResponseEntity<>(postService.getPostList(),HttpStatus.OK);
//    }
}
