package com.hansol.hanspoon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long department_id;

    @Column(name = "department_name")
    private String name;

    @Column(name = "company_id")
    private long companyId;
}
