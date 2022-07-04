package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID'")
    Optional<List<Post>> findValidPost();

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID' AND p.category_id = :id")
    Optional<List<Post>> findValidPostByCategoryId(@Param("id") Long category_id);

    @Query("SELECT p FROM Post p WHERE p.category_id = :id")
    Optional<List<Post>> findAllPostByCategoryId(@Param("id") Long category_id);

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID' AND p.post_id = :id")
    Optional<Post> findValidPostByPostId(@Param("id") Long post_id);
}
