package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.PostResponseDto;

import java.util.List;

public interface PostService {
    public List<PostResponseDto> getAllPostList();
    public List<PostResponseDto> getValidPostList();

}
