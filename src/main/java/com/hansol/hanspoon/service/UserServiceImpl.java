package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.DepartmentRepository;
import com.hansol.hanspoon.repository.PositionTypeRepository;
import com.hansol.hanspoon.repository.UserRepository;
import com.hansol.hanspoon.type.StateUserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Properties;
import java.util.Random;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.DUPLICATED_EMAIL;
import static com.hansol.hanspoon.exception.HanspoonErrorCode.NO_USER;

@Service
public class UserServiceImpl implements UserService{



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PositionTypeRepository positionTypeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new HanspoonException(NO_USER));
        if(!password.equals(user.getPassword()))
            throw new HanspoonException(NO_USER);
        return user;
    }

    @Override
    @Transactional
    public List<PositionType> selectAllPositionType() {
        return positionTypeRepository.findAll();
    }

    @Override
    @Transactional
    public List<Department> selectDepartmentByCompany(long company_id) {
        return departmentRepository.findByCompanyId(company_id);
    }

    @Override
    @Transactional
    public void signUp(UserRequestDto userRequestDto) {

        userRepository.findByEmail(userRequestDto.getEmail())
                .ifPresent((user->{throw new HanspoonException(DUPLICATED_EMAIL);}));
        userRepository.save(createUserFromRequest(userRequestDto));
    }

    public static User createUserFromRequest(UserRequestDto request){
        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .user_name(request.getUser_name())
                .age(request.getAge())
                .gender(request.getGender())
                .company_id(request.getCompany_id())
                .department_id(request.getDepartment_id())
                .position_type_id(request.getPosition_type_id())
                .state(StateUserType.VALID)
                .build();
    }


}
