package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.entity.User;
import org.springframework.stereotype.Service;


public interface UserService {
    User login(String email, String password);
}
