package com.hansol.hanspoon.repository;

import com.hansol.hanspoon.entity.PositionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface PositionTypeRepository extends JpaRepository<PositionType, Long> {
    List<PositionType> findAll();
}
