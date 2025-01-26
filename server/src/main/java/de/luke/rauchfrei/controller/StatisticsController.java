package de.luke.rauchfrei.controller;

import de.luke.rauchfrei.dto.StatisticsResponse;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<StatisticsResponse> getUserStatistics(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(statisticsService.getStatisticsForUser(user.getId()));
    }
} 