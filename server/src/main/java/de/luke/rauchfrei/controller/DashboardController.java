package de.luke.rauchfrei.controller;

import de.luke.rauchfrei.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {
    private final UserService userService;

    @GetMapping("/stats")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getDashboardStats(Principal principal) {
        try {
            if (principal == null) {
                log.error("Principal ist null");
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Nicht authentifiziert"));
            }
            log.info("Verarbeite Anfrage für Benutzer: {}", principal.getName());
            Map<String, Object> stats = userService.calculateDashboardStats(principal.getName());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Fehler beim Abrufen der Dashboard-Statistiken: {}", e.getMessage());
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", e.getMessage()));
        }
    }
} 