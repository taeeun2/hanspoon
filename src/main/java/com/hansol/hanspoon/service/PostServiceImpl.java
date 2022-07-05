package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.entity.PostUser;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.repository.*;
import com.hansol.hanspoon.type.StatePostType;
import com.hansol.hanspoon.type.StatePostUserType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;

import java.sql.Timestamp;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final PostUserRepository postUserRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PositionTypeRepository positionTypeRepository;
    private final DepartmentRepository departmentRepository;



    //(메인화면)전체 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getAllPostList() {
        List<PostResponseDto> retVal = postRepository.findAll().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        return retVal;
    }

    //(메인화면)카테고리별 전체 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getAllPostListByCategory(long category_id) {
        List<PostResponseDto> retVal = postRepository.findAllPostByCategoryId(category_id).get().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        return retVal;
    }

    //(메인화면)카테고리별 유효한 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getValidPostList() {
        List<PostResponseDto> retVal = postRepository.findValidPost().get().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
        return retVal;
    }

    @Override
    public List<PostResponseDto> getValidPostListByCategory(long category_id) {
        List<PostResponseDto> retVal = postRepository.findValidPostByCategoryId(category_id).get().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
        return retVal;
    }

    //(마이페이지0)신청 내역 게시글 리스트 가져오기 - 게시글 상태가 VALID이면서, postuser 테이블의 상태가 GUEST인 것
    @Override
    public List<PostResponseDto> getMyApplyPostList(long userId) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<PostUser> postUserList = postUserRepository.findGuestByUserId(userId).get();
        for(PostUser postUser: postUserList){
            long postId = postUser.getPost_id();
            Post post = postRepository.getById(postId);
            if(post.getState().toString().equals("VALID")){
                retVal.add( PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build());
            }
        }
        return retVal;
    }

    //(마이페이지1)지난 내역 게시글 리스트 가져오기 - 게시글 상태가 EXPIRED이면서, postuser테이블의 상태가 GUEST인 것
    @Override
    public List<PostResponseDto> getMyLastPostList(long userId) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<PostUser> postUserList = postUserRepository.findGuestByUserId(userId).get();
        for(PostUser postUser: postUserList) {
            long postId = postUser.getPost_id();
            Post post = postRepository.getById(postId);
            if(post.getState().toString().equals("EXPIRED")){
                retVal.add(PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build());
            }

            System.out.println("findExpiredPostByPostId: " + post.toString());

        }
        return retVal;
}

    //(마이페이지2)작성 이력 게시글 리스트 가져오기 - 게시글 상태가 VALID 또는 EXPIRED이면서, postuser테이블의 상태가 HOST인 것
    @Override
    public List<PostResponseDto> getMyRecruitPostList(long userId) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<PostUser> postUserList = postUserRepository.findHostByUserId(userId).get();
        for (PostUser postUser: postUserList) {
            long postId = postUser.getPost_id();
            Post post = postRepository.getById(postId);
            if(!post.getState().toString().equals("DELETED")){
                retVal.add( PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build());
            }
        }
        return retVal;
    }


    // 사용자가 공개한 정보만 추출하기
    private HashMap<String,Object> getUserOpenInfo(PostUser postUser){
        HashMap<String,Object> res = new HashMap<>();
        User user = userRepository.getById(postUser.getUser_id());
        if (postUser.isScope_name()){
            res.put("name", user.getUser_name());
        } else {
            res.put("name", "익명");
        }
        if (postUser.isScope_gender()){
            res.put("gender", user.getGender().getDescription());
        }
        if(postUser.isScope_age()){
            res.put("age", user.getAge().getDescription());
        }
        if(postUser.isScope_company()){
            res.put("company", companyRepository.getById(user.getCompany_id()).getCompany_name());
        }
        if(postUser.isScope_position()){
            res.put("position", positionTypeRepository.getById(user.getPosition_type_id()).getPosition_type_name());
        }
        if(postUser.isScope_department()){
            res.put("department", departmentRepository.getById(user.getDepartment_id()).getName());
        }
        res.put("spoon_num", user.getSpoon_num());

        return res;
    }

    @Override
    @Transactional
    public void createPost(PostRequestDto postRequestDto) {
       postUserRepository.save(createPostUserFromRequest(postRequestDto));
    }

    private PostUser createPostUserFromRequest(PostRequestDto postRequestDto) {
        return PostUser.builder()
                .state(StatePostUserType.HOST)
                .scope_name(postRequestDto.isScope_name())
                .scope_gender(postRequestDto.isScope_gender())
                .scope_age(postRequestDto.isScope_age())
                .scope_company(postRequestDto.isScope_company())
                .scope_position(postRequestDto.isScope_position_type())
                .scope_department(postRequestDto.isScope_department())
                .user_id(postRequestDto.getUser_id())
                .post_id( postRepository.save(createPostFromRequest(postRequestDto)).getPost_id())
                .build();
    }

    private Post createPostFromRequest(PostRequestDto postRequestDto) {
        return Post.builder()
                .title(postRequestDto.getTitle())
                .content(postRequestDto.getContent())
                .restaurant_name(postRequestDto.getRestaurant_name())
                .meet_date( Timestamp.valueOf(postRequestDto.getMeet_date()))
                .capacity(postRequestDto.getCapacity())
                .category_id(postRequestDto.getCategory_id())
                .state(StatePostType.VALID)
                .participant_num(1)
                .build();
    }
}
