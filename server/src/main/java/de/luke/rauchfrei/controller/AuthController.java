package de.luke.rauchfrei.controller;

import de.luke.rauchfrei.dto.AuthResponse;
import de.luke.rauchfrei.dto.LoginRequest;
import de.luke.rauchfrei.dto.RegisterRequest;
import de.luke.rauchfrei.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.http.HttpStatus;
import de.luke.rauchfrei.dto.ErrorResponse;
import de.luke.rauchfrei.exception.UserAlreadyExistsException;
import de.luke.rauchfrei.exception.ValidationException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (UserAlreadyExistsException e) {
            ErrorResponse error = ErrorResponse.builder()
                .message("Registrierung fehlgeschlagen")
                .errorCode("USER_EXISTS")
                .fieldErrors(Map.of("email", "Diese E-Mail-Adresse wird bereits verwendet"))
                .timestamp(LocalDateTime.now())
                .build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        } catch (ValidationException e) {
            ErrorResponse error = ErrorResponse.builder()
                .message("Validierungsfehler")
                .errorCode("VALIDATION_ERROR")
                .fieldErrors(e.getFieldErrors())
                .timestamp(LocalDateTime.now())
                .build();
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
