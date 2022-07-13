package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("select company_name from Company where company_id = :company_id")
    String findByCompany_id(@Param("company_id") long company_id);
}
