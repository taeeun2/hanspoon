package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.EmailResponseDto;
import com.hansol.hanspoon.dto.LoginRequestDto;
import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.service.EmailService;
import com.hansol.hanspoon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    public EmailService emailService;

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequestDto requestDto){
        return userService.login(requestDto.getEmail(),requestDto.getPassword());
    }

    @GetMapping("/sendEmail")
    public EmailResponseDto sendEmail(@RequestParam(value = "email", required = false) String email){
        System.out.println(email);
        return emailService.sendEmail(email);
    }

    @GetMapping("/select-all/position_type")
    public List<PositionType> selectAllPositionType(){
        return userService.selectAllPositionType();
    }


    @GetMapping("/select/department/{company_id}")
    public List<Department> selectDepartmentByCompany(@PathVariable int company_id ){
        return userService.selectDepartmentByCompany(company_id);
    }

   }
