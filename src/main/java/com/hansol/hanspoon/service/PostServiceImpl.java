package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.entity.PostUser;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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



    //전체 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getAllPostList() {
        List<PostResponseDto> retVal = postRepository.findAll().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostById(post.getPost_id())))
                        .guest(postUserRepository.findAllGuestById(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        return retVal;
    }

    //카테고리별 전체 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getAllPostListByCategory(long category_id) {
        List<PostResponseDto> retVal = postRepository.findAllPostByCategoryId(category_id).get().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostById(post.getPost_id())))
                        .guest(postUserRepository.findAllGuestById(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        return retVal;
    }

    //카테고리별 유효한 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getValidPostList() {
        List<PostResponseDto> retVal = postRepository.findValidPost().get().stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostById(post.getPost_id())))
                        .guest(postUserRepository.findAllGuestById(post.getPost_id()).get().stream()
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
                        .host(this.getUserOpenInfo(postUserRepository.findHostById(post.getPost_id())))
                        .guest(postUserRepository.findAllGuestById(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
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
}
