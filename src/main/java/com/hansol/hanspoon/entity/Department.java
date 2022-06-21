package com.hansol.hanspoon.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long department_id;

    private String department_name;
    private long company_id;
}
