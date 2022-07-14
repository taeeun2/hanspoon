package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.*;
import com.hansol.hanspoon.entity.*;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.CompanyRepository;
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

import java.util.*;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.*;

@Service
public class UserServiceImpl implements  UserService{



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PositionTypeRepository positionTypeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CompanyRepository companyRepository;

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
    public UserResponseDto signUp(UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userRepository.findByEmail(userRequestDto.getEmail())
                .ifPresent((user->{throw new HanspoonException(DUPLICATED_EMAIL);}));
        userRepository.save(createUserFromRequest(userRequestDto));
        userResponseDto.setEmail(userRequestDto.getEmail());
        return userResponseDto;
    }

    @Override
    @Transactional
    public HashMap<String, Object> getUserInfo(long user_id) {
        HashMap<String,Object> res = new HashMap<>();
        User user = userRepository.getById(user_id);
        res.put("company_name", companyRepository.findById(user.getCompany_id()).get().getCompany_name());
        res.put("department_name", departmentRepository.findById(user.getDepartment_id()).get().getName());
        res.put("position_type", positionTypeRepository.findById(user.getPosition_type_id()).get().getPosition_type_name());
        res.put("gender", user.getGender().getDescription());
        res.put("age", user.getAge().getDescription());
        res.put("spoon_num", user.getSpoon_num());
        res.put("spoon_rank", userRepository.findUserSpoonRank(user_id));
        res.put("join_duration", userRepository.findJoinDuration(user_id));
        return res;
    }

    //마이페이지
    @Override
    public Long getUserIdByName(String email) {
        return userRepository.findByEmail(email).get().getUser_id();
    }

    @Override
    public UserResponseDto edit(UserRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new HanspoonException(NO_EMAIL));
        if(request.getPassword().length() < 1){
            request.setPassword(user.getPassword());
        }
        user.editUser(request);
        userRepository.save(user);

        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setEmail(request.getEmail());
        return responseDto;
    }

    @Override
    public String getPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new HanspoonException(NO_EMAIL));
        return user.getPassword();
    }


    //가장 많은 숟가락 개수
    @Override
    public int maxSpoonNum() {
        return userRepository.findMaxSpoonNum();
    }

    //가장 많은 숟가락을 모은 회사(리스트)
    @Override
    public List<Long> mostSpoonCompany() {
        return userRepository.findMostSpoonCompany();
    }

    //가장 많은 숟가락을 모은 연령대(리스트)
    @Override
    public List<String> mostSpoonAge() {
        return userRepository.findMostSpoonAge();
    }

    @Override
    public List<ChartDataDto> getChartData(long tab_id) {
        List<ChartDataDto> res = new ArrayList<>();

        if(tab_id == 1) { //성별
            List<ChartDataInterfaceGender> chartData = userRepository.findGenderCount();
            for (ChartDataInterfaceGender i: chartData){
                res.add(new ChartDataDto(i));
            }

        } else if (tab_id == 2) { //소속회사
            List<ChartDataInterface> chartData = userRepository.findCompanyCount();
            for (ChartDataInterface i: chartData){
                res.add(new ChartDataDto(i));
            }

        } else if (tab_id == 3) { //연령대
            List<ChartDataInterfaceAge> chartData = userRepository.findAgeData();
            for (ChartDataInterfaceAge i: chartData){
                res.add(new ChartDataDto(i));
            }

        } else if (tab_id == 4) { //직급
            List<ChartDataInterface> chartData = userRepository.findPositionData();
            for (ChartDataInterface i: chartData){
                res.add(new ChartDataDto(i));
            }
        }

        return res;
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
