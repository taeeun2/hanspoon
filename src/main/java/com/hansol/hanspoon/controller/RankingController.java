package com.hansol.hanspoon.controller;

import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.repository.CompanyRepository;
import com.hansol.hanspoon.service.PostService;
import com.hansol.hanspoon.service.UserService;
import com.hansol.hanspoon.type.AgeGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/rank")
public class RankingController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyRepository companyRepository;

    //인기 있는 식당
    @GetMapping("/popularRestaurant")
    public List<String> popularRestaurant(){
        return postService.popularRestaurantRankings();
    }

    //역대 모임 수
    @GetMapping("/numberOfMeetings")
    public int numberOfMeetings(){
        return postService.numberOfMeetings();
    }

    //가장 많은 숟가락 개수
    @GetMapping("/maxSpoonNum")
    public int maxSpoonNum(){
        return userService.maxSpoonNum();
    }

    //가장 많은 숟가락을 모은 회사(리스트)
    @GetMapping("/mostSpoonCompany")
    public List<String> mostSpoonCompany(){
        List<Long> companyIdList = userService.mostSpoonCompany();
        List<String> companyList = new ArrayList<>();
        for(long companyId : companyIdList){
            companyList.add(companyRepository.findByCompany_id(companyId));
        }
        return companyList;
    }

    //가장 많은 숟가락을 모은 연령대(리스트)
    @GetMapping("/mostSpoonAge")
    public List<String> mostSpoonAge(){
        List<String> ageList = userService.mostSpoonAge();

        //영어를 한글로 바꾸기
        List<String> new_list = new ArrayList<>();
        for(String age : ageList){
            age = AgeGroup.valueOf(age).getDescription();
            new_list.add(age);
        }
        return new_list;
    }



}
