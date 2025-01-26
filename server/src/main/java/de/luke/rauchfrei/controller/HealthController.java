package de.luke.rauchfrei.controller;

import de.luke.rauchfrei.dto.HealthProgressResponse;
import de.luke.rauchfrei.service.HealthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HealthController {

    private final HealthService healthService;

    @GetMapping("/progress")
    public ResponseEntity<?> getHealthProgress(Authentication authentication) {
        try {
            if (authentication == null) {
                log.error("Keine Authentifizierung vorhanden");
                return ResponseEntity.status(401).body("Nicht authentifiziert");
            }

            String userEmail = authentication.getName();
            log.info("Hole Gesundheitsdaten für Benutzer: {}", userEmail);
            
            HealthProgressResponse response = healthService.getHealthProgress(userEmail);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Fehler beim Abrufen der Gesundheitsdaten", e);
            return ResponseEntity.status(500)
                    .body("Fehler beim Abrufen der Gesundheitsdaten: " + e.getMessage());
        }
    }
} 