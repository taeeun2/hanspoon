package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.PostApplyRequestDto;
import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.dto.PostResponseDto;

import java.util.List;

public interface PostService {
    /* 메인 화면 */
    public List<PostResponseDto> getAllPostList();
    public List<PostResponseDto> getAllPostListByCategory(long category_id);
    public List<PostResponseDto> getValidPostList();
    public List<PostResponseDto> getValidPostListByCategory(long category_id);

    /* 마이페이지 */
    public List<PostResponseDto> getMyApplyPostList(long userId);
    public List<PostResponseDto> getMyLastPostList(long userId);
    public List<PostResponseDto> getMyRecruitPostList(long userId);

    /* 상세페이지 */
    public PostResponseDto getPostDetail(long post_id);
    public void createPost(PostRequestDto postRequestDto);
    public void applyPost(PostApplyRequestDto postApplyRequestDto);
    public void deletePost(long post_id);
}
