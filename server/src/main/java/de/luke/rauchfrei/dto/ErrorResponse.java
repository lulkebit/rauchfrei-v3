package de.luke.rauchfrei.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class ErrorResponse {
    private String message;
    private String errorCode;
    private Map<String, String> fieldErrors;
    private LocalDateTime timestamp;
} 