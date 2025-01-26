package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.UserProfileRequest;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User updateProfile(UserProfileRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
        
        user.setProfileImage(request.getProfileImage());
        user.setRauchfreiSeit(request.getRauchfreiSeit());
        user.setZigarettenProTag(request.getZigarettenProTag());
        user.setPreisProPackung(request.getPreisProPackung());
        user.setZigarettenProPackung(request.getZigarettenProPackung());
        
        return userRepository.save(user);
    }

    public Map<String, Object> calculateDashboardStats(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        LocalDateTime rauchfreiSeit = user.getRauchfreiSeit();
        long rauchfreiTage = ChronoUnit.DAYS.between(rauchfreiSeit, LocalDateTime.now());
        
        double gespartesGeld = rauchfreiTage * 
            (user.getZigarettenProTag() * user.getPreisProPackung() / user.getZigarettenProPackung());
        
        int vermiedeneZigaretten = (int) (rauchfreiTage * user.getZigarettenProTag());

        Map<String, Object> stats = new HashMap<>();
        stats.put("rauchfreiTage", rauchfreiTage);
        stats.put("vermiedeneZigaretten", vermiedeneZigaretten);
        stats.put("gespartesGeld", Math.round(gespartesGeld * 100.0) / 100.0);

        return stats;
    }

    public Map<String, Object> getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        Map<String, Object> profile = new HashMap<>();
        profile.put("username", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("profileImage", user.getProfileImage());
        profile.put("rauchfreiSeit", user.getRauchfreiSeit());
        profile.put("zigarettenProTag", user.getZigarettenProTag());
        profile.put("preisProPackung", user.getPreisProPackung());
        profile.put("zigarettenProPackung", user.getZigarettenProPackung());
        
        return profile;
    }
}
