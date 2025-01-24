package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.UserProfileRequest;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
