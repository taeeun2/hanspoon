package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.EmailResponseDto;
import com.hansol.hanspoon.dto.FindPwRequestDto;
import com.hansol.hanspoon.dto.FindPwResponseDto;

public interface EmailService {
    EmailResponseDto sendEmail(String email);

    FindPwResponseDto findPW(FindPwRequestDto request);
}
