package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT sub.RANK " +
            "FROM ( " +
            " SELECT u.user_id, RANK() over (ORDER BY u.spoon_num DESC) AS RANK FROM user u  " +
            ") AS sub " +
            "WHERE sub.user_id = :id", nativeQuery = true)
    int findUserSpoonRank(@Param("id") Long user_id);

    @Query(value = "SELECT DATEDIFF(NOW(), u.create_date) + 1 duration FROM user u WHERE u.user_id = :id", nativeQuery = true)
    long findJoinDuration(@Param("id") Long user_id );
}