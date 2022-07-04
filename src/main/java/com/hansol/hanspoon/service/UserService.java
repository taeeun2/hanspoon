package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.dto.UserResponseDto;
import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    User login(String email, String password);
    List<PositionType> selectAllPositionType();

    List<Department> selectDepartmentByCompany(long company_id);

    UserResponseDto signUp(UserRequestDto userRequestDto);

    //마이페이지
    Long getUserIdByName(String email);

}
