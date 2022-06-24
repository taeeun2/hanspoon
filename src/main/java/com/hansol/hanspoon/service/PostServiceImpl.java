package com.hansol.hanspoon.service;

import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    @Transactional
    public List<Post> getPostList() {

        return postRepository.findAll();
    }
}
