package de.luke.rauchfrei.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String username;
    private String profileImage;
    private LocalDateTime rauchfreiSeit;
    private Integer zigarettenProTag;
    private Double preisProPackung;
    private Integer zigarettenProPackung;
} 