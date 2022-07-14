package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
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

    @Query("SELECT MAX(spoon_num) FROM User")
    int findMaxSpoonNum();

    @Query("SELECT company_id " +
            "FROM User " +
            "GROUP BY company_id " +
            "ORDER BY sum(spoon_num) DESC ")
    List<Long> findMostSpoonCompany();

    @Query("SELECT age " +
            "FROM User " +
            "GROUP BY age " +
            "ORDER BY sum(spoon_num) DESC")
    List<String> findMostSpoonAge();

    @Query(value = "SELECT u.gender AS type, COUNT(u.user_id) AS count FROM User u GROUP BY u.gender", nativeQuery = true)
    List<ChartDataInterfaceGender> findGenderCount();

    @Query(value = "SELECT c.company_name type, COUNT(*) count\n" +
            "FROM User u LEFT OUTER JOIN Company c\n" +
            "ON u.company_id = c.company_id\n" +
            "GROUP BY u.company_id;", nativeQuery = true)
    List<ChartDataInterface> findCompanyCount();

    @Query(value = "SELECT age type, COUNT(*) count FROM user GROUP BY age;", nativeQuery = true)
    List<ChartDataInterfaceAge> findAgeData();

    @Query(value = "SELECT p.position_type_name type, COUNT(*) count\n" +
            "FROM user u LEFT OUTER JOIN position_type p\n" +
            "ON u.position_type_id=p.position_type_id\n" +
            "GROUP BY u.position_type_id;", nativeQuery = true)
    List<ChartDataInterface> findPositionData();

}