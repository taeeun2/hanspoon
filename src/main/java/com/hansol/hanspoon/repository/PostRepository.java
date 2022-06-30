package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID'")
    List<Post> findAllValidPost();
}
