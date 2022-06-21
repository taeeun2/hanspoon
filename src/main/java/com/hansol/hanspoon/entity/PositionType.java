package com.hansol.hanspoon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class PositionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long position_type_id;

    private String position_type_name;
}
