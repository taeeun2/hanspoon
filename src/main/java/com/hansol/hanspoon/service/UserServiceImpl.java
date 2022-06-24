package com.hansol.hanspoon.service;

import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.NO_USER;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow();
        if(password != user.getPassword())
            throw new HanspoonException(NO_USER);
        return user;
    }
}
