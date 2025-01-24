package de.luke.rauchfrei.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserProfileRequest {
    private String username;
    private String profileImage;
    private LocalDateTime rauchfreiSeit;
    private Integer zigarettenProTag;
    private Double preisProPackung;
    private Integer zigarettenProPackung;
} 