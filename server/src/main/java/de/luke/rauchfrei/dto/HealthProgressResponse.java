package de.luke.rauchfrei.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HealthProgressResponse {
    private List<HealthMetric> shortTerm;
    private List<HealthMetric> longTerm;
    private List<HealthMetric> permanentDamage;
    private UserHealthStats userStats;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HealthMetric {
        private Long id;
        private String metricName;
        private Double currentValue;
        private Double maxValue;
        private String unit;
        private String description;
        private String achievementDate;
        private Boolean isPermanentDamage;
        private String recoveryStartDate;
        private String expectedRecoveryDate;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserHealthStats {
        private Integer alter;
        private Integer rauchdauerJahre;
        private String vorerkrankungen;
        private Double koerpergewicht;
        private String sportAktivitaet;
    }
} 