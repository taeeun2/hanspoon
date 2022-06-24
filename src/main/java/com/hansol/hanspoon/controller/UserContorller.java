package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.LoginRequestDto;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserContorller {

    @Autowired
    public UserService userService;

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequestDto requestDto){
        return userService.login(requestDto.getEmail(),requestDto.getPassword());
    }
}
