package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Post;
import com.hansol.hanspoon.type.StatePostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE NOT p.state = 'DELETED' ORDER BY p.post_id desc")
    Optional<List<Post>> findAllByOrderByPostIdDesc();

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID' ORDER BY p.post_id desc")
    Optional<List<Post>> findValidPost();

    @Query("SELECT p FROM Post p WHERE p.state = 'VALID' AND p.category_id = :id ORDER BY p.post_id desc")
    Optional<List<Post>> findValidPostByCategoryId(@Param("id") Long category_id);

    @Query("SELECT p FROM Post p WHERE p.category_id = :id AND NOT p.state = 'DELETED' ORDER BY p.post_id desc")
    Optional<List<Post>> findAllPostByCategoryId(@Param("id") Long category_id);

    Optional<List<Post>> findByState(StatePostType statePostType);
}
