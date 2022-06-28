package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.EmailResponseDto;

public interface EmailService {
    EmailResponseDto sendEmail(String email);
}
