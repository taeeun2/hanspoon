package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.ChartDataDto;
import com.hansol.hanspoon.dto.FindPwRequestDto;
import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.dto.UserResponseDto;
import com.hansol.hanspoon.entity.ChartDataInterface;
import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;


public interface UserService {
    User login(String email, String password);
    List<PositionType> selectAllPositionType();

    List<Department> selectDepartmentByCompany(long company_id);

    UserResponseDto signUp(UserRequestDto userRequestDto);

    //마이페이지
    HashMap<String,Object> getUserInfo(long user_id);

    Long getUserIdByName(String email);

    UserResponseDto edit(UserRequestDto request);

    //비밀번호 찾기
    String getPassword(String email);

    //순위 페이지
    int maxSpoonNum();
    List<Long> mostSpoonCompany();
    List<String> mostSpoonAge();

    //메인화면 모달
    List<ChartDataDto> getChartData(long tab_id);

}
