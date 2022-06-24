package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
