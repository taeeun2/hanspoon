package com.hansol.hanspoon.service;

import com.hansol.hanspoon.entity.Department;
import com.hansol.hanspoon.entity.PositionType;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.DepartmentRepository;
import com.hansol.hanspoon.repository.PositionTypeRepository;
import com.hansol.hanspoon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Properties;
import java.util.Random;

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
        System.out.println(password + user.getPassword());
        if(!password.equals(user.getPassword()))
            throw new HanspoonException(NO_USER);
        return user;
    }

    @Override
    public List<PositionType> selectAllPositionType() {
        return positionTypeRepository.findAll();
    }

    @Override
    public List<Department> selectDepartmentByCompany(int company_id) {
        return departmentRepository.findByCompanyId(company_id);
    }


}
