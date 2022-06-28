package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findByCompanyId(int company_id);
}
