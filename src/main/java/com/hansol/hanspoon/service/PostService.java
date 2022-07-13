package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.*;

import java.util.List;
import java.util.Map;

public interface PostService {
    /* 메인 화면 */
    public void updatePostAndSpoon();
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
    public CreatePostResponseDto createPost(PostRequestDto postRequestDto);
    public void applyPost(PostApplyRequestDto postApplyRequestDto);
    public void deletePost(long post_id);
    public void cancelApply(long post_id, long user_id);
    public void editPost(EditPostRequestDto requestDto);

    /* 순위 페이지 */
    public List<String> popularRestaurantRankings();
    public int numberOfMeetings();
}
