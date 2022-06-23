package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.UserRequestDto;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException((email)));
    }

    public Long save(UserRequestDto requestDto){
        //비밀번호 암호화해서 DB에 저장
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        requestDto.setPassword(encoder.encode(requestDto.getPassword()));

        return userRepository.save(User.builder()
                .email(requestDto.getEmail()).build()).getUser_id();

    }
}
