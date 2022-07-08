package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.dto.*;
import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.service.EmailService;
import com.hansol.hanspoon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequestDto requestDto){
        return userService.login(requestDto.getEmail(),requestDto.getPassword());
    }

    @GetMapping("/sendEmail")
    public EmailResponseDto sendEmail(@RequestParam(value = "email", required = false) String email){
        return emailService.sendEmail(email);
    }

    @GetMapping("/select-all/position_type")
    public List<PositionType> selectAllPositionType(){
        return userService.selectAllPositionType();
    }


    @GetMapping("/select/department/{company_id}")
    public List<Department> selectDepartmentByCompany(@PathVariable long company_id ){
        return userService.selectDepartmentByCompany(company_id);
    }

    @PostMapping("/signUp") //ResponseEntity -> ResponseSignUp 으로 바꾸기
    public UserResponseDto signUp(@RequestBody UserRequestDto userRequestDto){


        return userService.signUp(userRequestDto);
    }

    @PostMapping("/findPw")
    public FindPwResponseDto findPw(@RequestBody FindPwRequestDto findPwRequestDto){
        return emailService.findPW(findPwRequestDto);
    }

    @PostMapping("/edit")
    public UserResponseDto edit(@RequestBody UserRequestDto userRequestDto){
        return userService.edit(userRequestDto);
    }

   @GetMapping("/getPassword")
    public HashMap<String, String> getPassword(@RequestParam(value = "email", required = false) String email){
       System.out.println("password : "+userService.getPassword(email));
       HashMap<String, String> map = new HashMap<>();
       map.put("password", userService.getPassword(email));
     return map;
   }
}