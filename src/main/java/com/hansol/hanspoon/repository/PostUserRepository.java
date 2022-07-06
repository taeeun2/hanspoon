package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.PostUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostUserRepository extends JpaRepository<PostUser, Long> {
    @Query("SELECT pu FROM PostUser pu WHERE pu.post_id = :id AND pu.state = 'HOST'")
    PostUser findHostByPostId(@Param("id") Long post_id);

    @Query("SELECT pu FROM PostUser pu WHERE pu.post_id = :id AND pu.state = 'GUEST'")
    Optional<List<PostUser>> findGuestByPostId(@Param("id") Long post_id);

    @Query("SELECT pu FROM PostUser pu WHERE pu.user_id = :id AND pu.state = 'GUEST'")
    Optional<List<PostUser>> findGuestByUserId(@Param("id") Long user_id);

    @Query("SELECT pu FROM PostUser pu WHERE pu.user_id = :id AND pu.state = 'HOST'")
    Optional<List<PostUser>> findHostByUserId(@Param("id") Long user_id);

    @Query("SELECT pu FROM PostUser pu WHERE pu.post_id = :postId AND pu.user_id = :userId AND pu.state = 'GUEST'")
    Optional<PostUser> findByPostAndUserId(@Param("postId") Long post_id, @Param("userId") Long user_id);
}
