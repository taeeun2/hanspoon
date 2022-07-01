package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.PostRequestDto;
import com.hansol.hanspoon.dto.PostResponseDto;

import java.util.List;

public interface PostService {
    public List<PostResponseDto> getAllPostList();
    public List<PostResponseDto> getAllPostListByCategory(long category_id);
    public List<PostResponseDto> getValidPostList();
    public List<PostResponseDto> getValidPostListByCategory(long category_id);

    public void createPost(PostRequestDto postRequestDto);
}
