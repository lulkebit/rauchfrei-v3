package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.UserProfileRequest;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    private User findUserByEmailOrUsername(String identifier) {
        log.debug("Suche Benutzer mit Identifier: {}", identifier);
        
        Optional<User> user = userRepository.findByEmail(identifier);
        if (user.isEmpty()) {
            user = userRepository.findByUsername(identifier);
        }
        
        return user.orElseThrow(() -> {
            log.error("Benutzer mit Identifier {} nicht gefunden", identifier);
            return new RuntimeException("Benutzer nicht gefunden");
        });
    }

    public User updateProfile(UserProfileRequest request) {
        User user = findUserByEmailOrUsername(request.getUsername());
        
        user.setProfileImage(request.getProfileImage());
        user.setRauchfreiSeit(request.getRauchfreiSeit());
        user.setZigarettenProTag(request.getZigarettenProTag());
        user.setPreisProPackung(request.getPreisProPackung());
        user.setZigarettenProPackung(request.getZigarettenProPackung());
        
        return userRepository.save(user);
    }

    public Map<String, Object> calculateDashboardStats(String identifier) {
        log.debug("Berechne Dashboard-Statistiken für Identifier: {}", identifier);
        
        User user = findUserByEmailOrUsername(identifier);
        log.debug("Benutzer gefunden: {}", user.getUsername());

        if (user.getRauchfreiSeit() == null) {
            log.warn("Rauchfrei-Datum für Benutzer {} ist nicht gesetzt", user.getUsername());
            throw new RuntimeException("Rauchfrei-Datum nicht gesetzt");
        }

        LocalDateTime rauchfreiSeit = user.getRauchfreiSeit();
        long rauchfreiTage = ChronoUnit.DAYS.between(rauchfreiSeit, LocalDateTime.now());
        
        double gespartesGeld = rauchfreiTage * 
            (user.getZigarettenProTag() * user.getPreisProPackung() / user.getZigarettenProPackung());
        
        int vermiedeneZigaretten = (int) (rauchfreiTage * user.getZigarettenProTag());

        Map<String, Object> stats = new HashMap<>();
        stats.put("rauchfreiTage", rauchfreiTage);
        stats.put("vermiedeneZigaretten", vermiedeneZigaretten);
        stats.put("gespartesGeld", Math.round(gespartesGeld * 100.0) / 100.0);

        log.debug("Dashboard-Statistiken erfolgreich berechnet für {}", user.getUsername());
        return stats;
    }

    public Map<String, Object> getUserProfile(String identifier) {
        User user = findUserByEmailOrUsername(identifier);

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
