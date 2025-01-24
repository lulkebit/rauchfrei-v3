package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.AuthResponse;
import de.luke.rauchfrei.dto.LoginRequest;
import de.luke.rauchfrei.dto.RegisterRequest;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.repository.UserRepository;
import de.luke.rauchfrei.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private String formatProfileImage(String profileImage) {
        if (profileImage == null) return null;
        if (profileImage.startsWith("data:image")) {
            return profileImage;
        }
        return "data:image/jpeg;base64," + profileImage;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email bereits registriert");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .profileImage(request.getProfileImage())
                .rauchfreiSeit(request.getRauchfreiSeit())
                .zigarettenProTag(request.getZigarettenProTag())
                .preisProPackung(request.getPreisProPackung())
                .zigarettenProPackung(request.getZigarettenProPackung())
                .build();

        user = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .profileImage(formatProfileImage(user.getProfileImage()))
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Ungültige Anmeldedaten"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Ungültige Anmeldedaten");
        }

        String token = jwtTokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .profileImage(formatProfileImage(user.getProfileImage()))
                .build();
    }
}
