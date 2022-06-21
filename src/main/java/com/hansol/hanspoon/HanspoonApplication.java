package com.hansol.hanspoon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})//DB 없이 테스트
public class HanspoonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HanspoonApplication.class, args);
	}

}
