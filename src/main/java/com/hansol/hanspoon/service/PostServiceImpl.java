package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.CreatePostResponseDto;
import com.hansol.hanspoon.dto.PostApplyRequestDto;
import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.dto.PostResponseDto;
import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.entity.PostUser;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.*;
import com.hansol.hanspoon.type.StatePostType;
import com.hansol.hanspoon.type.StatePostUserType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.*;

import java.sql.Timestamp;

import java.util.stream.Collectors;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.NO_EMAIL;

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

    @Value("${email.username}")
    private String username;

    @Value("${email.password}")
    private String password;



    //(메인화면)전체 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getAllPostList() {
        List<Post> postList = postRepository.findAllByOrderByPostIdDesc().get();
        postList.stream().forEach(post -> {
                    if(post.getMeet_date().before(new Date())
                            && (post.getState().toString().equals("VALID") || post.getState().toString().equals("FULL"))){
                        post.setStatusExpired();
                        List<PostUser> postUsers = postUserRepository.findByPostId(post.getPost_id()).get();
                        for (PostUser pu: postUsers) {
                            User user = userRepository.getById(pu.getUser_id());
                            user.increaseSpoonNum();
                        }
                    }});
        List<PostResponseDto> retVal = postList.stream()
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
        List<Post> postList = postRepository.findAllPostByCategoryId(category_id).get();
        postList.stream().forEach(post -> {
            if(post.getMeet_date().before(new Date())
                    && (post.getState().toString().equals("VALID") || post.getState().toString().equals("FULL"))){
                post.setStatusExpired();
                List<PostUser> postUsers = postUserRepository.findByPostId(post.getPost_id()).get();
                for (PostUser pu: postUsers) {
                    User user = userRepository.getById(pu.getUser_id());
                    user.increaseSpoonNum();
                }
            }});
        List<PostResponseDto> retVal = postList.stream()
                .map(post -> PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        return retVal;
    }

    //(메인화면)유효한 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getValidPostList() {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<Post> postList = postRepository.findValidPost().get();

        postList.stream().forEach(post -> {
        if(post.getMeet_date().before(new Date())){
            post.setStatusExpired();
            List<PostUser> postUsers = postUserRepository.findByPostId(post.getPost_id()).get();
            for (PostUser pu: postUsers) {
                User user = userRepository.getById(pu.getUser_id());
                user.increaseSpoonNum();
            }
        } else {
            retVal.add(PostResponseDto.builder()
                    .post(post)
                    .category(categoryRepository.findById(post.getCategory_id()).get())
                    .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                    .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                            .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                    .build());
        }
        });
//        List<PostResponseDto> retVal = postList.stream().filter(post -> post.getState().toString().equals("VALID"))
//                .map(post -> PostResponseDto.builder()
//                        .post(post)
//                        .category(categoryRepository.findById(post.getCategory_id()).get())
//                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
//                            .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
//                                    .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
//                            .build()).collect(Collectors.toList());
        return retVal;
    }

    //(메인화면)카테고리별 유효한 게시글 리스트 가져오기
    @Override
    @Transactional
    public List<PostResponseDto> getValidPostListByCategory(long category_id) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<Post> postList = postRepository.findValidPostByCategoryId(category_id).get();

        postList.stream().forEach(post -> {
            if(post.getMeet_date().before(new Date())){
                post.setStatusExpired();
                List<PostUser> postUsers = postUserRepository.findByPostId(post.getPost_id()).get();
                for (PostUser pu: postUsers) {
                    User user = userRepository.getById(pu.getUser_id());
                    user.increaseSpoonNum();
                }
            } else {
                retVal.add(PostResponseDto.builder()
                        .post(post)
                        .category(categoryRepository.findById(post.getCategory_id()).get())
                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                        .build());
            }
        });
//        List<PostResponseDto> retVal = postList.stream().filter(post -> post.getState().toString().equals("VALID"))
//                .map(post -> PostResponseDto.builder()
//                        .post(post)
//                        .category(categoryRepository.findById(post.getCategory_id()).get())
//                        .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
//                        .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
//                                .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
//                        .build()).collect(Collectors.toList());
        return retVal;
    }

    //(마이페이지0)신청 내역 게시글 리스트 가져오기 - 게시글 상태가 VALID 또는 FULL이면서, postuser 테이블의 상태가 GUEST인 것
    @Override
    @Transactional
    public List<PostResponseDto> getMyApplyPostList(long userId) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<PostUser> postUserList = postUserRepository.findGuestByUserId(userId).get();
        for(PostUser postUser: postUserList){
            long postId = postUser.getPost_id();
            Post post = postRepository.getById(postId);
            if(post.getMeet_date().before(new Date())) {
                post.setStatusExpired();
                List<PostUser> postUsers = postUserRepository.findByPostId(post.getPost_id()).get();
                for (PostUser pu: postUsers) {
                    User user = userRepository.getById(pu.getUser_id());
                    user.increaseSpoonNum();
                }
            }
            else if(post.getState().toString().equals("VALID") || post.getState().toString().equals("FULL") ){
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
    @Transactional
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
    @Transactional
    public List<PostResponseDto> getMyRecruitPostList(long userId) {
        List<PostResponseDto> retVal = new ArrayList<>();
        List<PostUser> postUserList = postUserRepository.findHostByUserId(userId).get();
        for (PostUser postUser: postUserList) {
            long postId = postUser.getPost_id();
            Post post = postRepository.getById(postId);
            if(!post.getState().toString().equals("DELETED")){
                System.out.println(post.getState().toString());
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

    // (상세 페이지) 게시글 상세 정보 가져오기
    @Override
    @Transactional
    public PostResponseDto getPostDetail(long post_id) {
        Post post = postRepository.getById(post_id);
        return PostResponseDto.builder()
                .post(post)
                .category(categoryRepository.findById(post.getCategory_id()).get())
                .host(this.getUserOpenInfo(postUserRepository.findHostByPostId(post.getPost_id())))
                .guest(postUserRepository.findGuestByPostId(post.getPost_id()).get().stream()
                        .map(guest -> this.getUserOpenInfo(guest)).collect(Collectors.toList()))
                .build();
    }


    // 사용자가 공개한 정보만 추출하기
    private HashMap<String,Object> getUserOpenInfo(PostUser postUser){
        HashMap<String,Object> res = new HashMap<>();
        User user = userRepository.getById(postUser.getUser_id());
        res.put("id",user.getUser_id());
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

    // 모임 생성하기
    @Override
    @Transactional
    public CreatePostResponseDto createPost(PostRequestDto postRequestDto) {
       PostUser postUser = postUserRepository.save(createPostUserFromRequest(postRequestDto));
       CreatePostResponseDto createPostResponse = new CreatePostResponseDto();
       createPostResponse.setPost_id(postUser.getPost_id());
       return createPostResponse;
    }

    // (상세 페이지) 모임 신청하기
    @Override
    @Transactional
    public void applyPost(PostApplyRequestDto postApplyRequestDto) {
        Post post = postRepository.findById(postApplyRequestDto.getPost_id())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        post.increaseParticipantNum();

        if(post.getCapacity() == post.getParticipant_num()){
           post.setStatusFull();
        }
        PostUser postUser = PostUser.builder()
                .state(StatePostUserType.GUEST)
                .scope_age(postApplyRequestDto.isScope_age())
                .scope_gender(postApplyRequestDto.isScope_gender())
                .scope_company(postApplyRequestDto.isScope_company())
                .scope_department(postApplyRequestDto.isScope_department())
                .scope_name(postApplyRequestDto.isScope_name())
                .scope_position(postApplyRequestDto.isScope_position_type())
                .post_id(postApplyRequestDto.getPost_id())
                .user_id(postApplyRequestDto.getUser_id())
                .build();
        postUserRepository.save(postUser);

    }

    // (상세 페이지) 모임 삭제하기
    @Override
    @Transactional
    public void deletePost(long post_id) {
        Post post = postRepository.findById(post_id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        post.updateToDeleted();

        //신청자 전원에 모임 삭제 메일 전송하기
        java.text.SimpleDateFormat dateTimeFormat = new java.text.SimpleDateFormat("yyyy.MM.dd HH시 mm분");
        String meet_date = dateTimeFormat.format(post.getMeet_date());

        String subject = "Hanspoon 모임 취소 안내";
        String body = "";
        body+= "<div style='margin:100px;'>";
        body+= "<h2>안녕하세요 Hanspoon입니다. </h2>";
        body+= "<br>";
        body+= "<p><strong>" + post.getTitle() + "</strong> 모임이 취소되었음을 안내드립니다.<p>";
        body+= "<br>";
        body+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        body+= "<h3 style='color:blue;'>취소된 모임 정보</h3>";
        body+= "<div style='font-size:130%'>";
        body+= "모임 일정 : " + meet_date + "<br>";
        body+= "모임 장소 : " + post.getRestaurant_name() + "<br>";
        body+= "<div>";
        body+= "</div>";

        List<Long> userIds= postUserRepository.findByPostId(post_id).get()
                .stream().map(postUser -> postUser.getUser_id()).collect(Collectors.toList());
        for(long userId: userIds){
           String recipient = userRepository.findById(userId).get().getEmail();
           sendEmailToUser(recipient, subject, body);
        }

    }

    // (상세 페이지) 모임 신청 취소하기
    @Override
    @Transactional
    public void cancelApply(long post_id, long user_id) {
        PostUser postUser = postUserRepository.findByPostAndUserId(post_id, user_id).get();
        long post_user_id = postUser.getPost_user_id();
        postUserRepository.delete(postUser);

        Post post = postRepository.findById(post_id).get();
        post.decreaseParticipantNum();
        post.setStatusValid();
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
                .restaurant_address(postRequestDto.getRestaurant_address())
                .meet_date( Timestamp.valueOf(postRequestDto.getMeet_date()))
                .capacity(postRequestDto.getCapacity())
                .category_id(postRequestDto.getCategory_id())
                .state(StatePostType.VALID)
                .participant_num(1)
                .build();
    }

    private void sendEmailToUser(String recipient, String subject, String body) {

        String host = "smtp.naver.com";
        int port=465;

        Properties props = System.getProperties();

        props.put("mail.smtp.host",host);
        props.put("mail.smtp.port",port);
        props.put("mail.smtp.auth","true");
        props.put("mail.smtp.ssl.enable","true");
        props.put("mail.smtp.ssl.trust",host);

        Session session = Session.getDefaultInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,password);
            }
        });

        session.setDebug(true);

        Message mimeMessage = new MimeMessage(session);
        try {
            mimeMessage.setFrom(new InternetAddress("kte2461@naver.com","Hanspoon"));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
            mimeMessage.setSubject(subject);
            mimeMessage.setContent(body, "text/html;charset=euc-kr");
            Transport.send(mimeMessage);

        } catch (MessagingException e) {
            throw new HanspoonException(NO_EMAIL);

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
