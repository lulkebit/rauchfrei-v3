package de.luke.rauchfrei.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Email ist erforderlich")
    @Email(message = "Ungültiges Email-Format")
    private String email;
    
    @NotBlank(message = "Passwort ist erforderlich")
    @Size(min = 8, message = "Passwort muss mindestens 8 Zeichen lang sein")
    private String password;
    
    @NotBlank(message = "Benutzername ist erforderlich")
    private String username;
    
    private String profileImage;
    
    @NotNull(message = "Rauchfrei seit Datum ist erforderlich")
    private LocalDateTime rauchfreiSeit;
    
    @NotNull(message = "Zigaretten pro Tag ist erforderlich")
    @Min(value = 1, message = "Mindestens 1 Zigarette")
    @Max(value = 100, message = "Maximal 100 Zigaretten")
    private Integer zigarettenProTag;
    
    @NotNull(message = "Preis pro Packung ist erforderlich")
    @Positive(message = "Preis muss positiv sein")
    private Double preisProPackung;
    
    @NotNull(message = "Zigaretten pro Packung ist erforderlich")
    @Min(value = 1, message = "Mindestens 1 Zigarette pro Packung")
    private Integer zigarettenProPackung;
} 