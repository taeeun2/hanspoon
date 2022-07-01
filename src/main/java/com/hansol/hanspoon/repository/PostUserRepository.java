package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.PostUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostUserRepository extends JpaRepository<PostUser, Long> {
    @Query("SELECT pu FROM PostUser pu WHERE pu.post_id = :id AND pu.state = 'HOST'")
    PostUser findHostById(@Param("id") Long post_id);

    @Query("SELECT pu FROM PostUser pu WHERE pu.post_id = :id AND pu.state = 'GUEST'")
    Optional<List<PostUser>> findAllGuestById(@Param("id") Long post_id);
}
