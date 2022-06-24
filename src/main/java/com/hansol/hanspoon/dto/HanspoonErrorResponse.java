package com.hansol.hanspoon.dto;

import com.hansol.hanspoon.exception.HanspoonErrorCode;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HanspoonErrorResponse {
    private HanspoonErrorCode errorCode;
    private String errorMessage;

}
