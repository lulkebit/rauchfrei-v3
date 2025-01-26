package de.luke.rauchfrei.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponse {
    private RauchfreiStats rauchfreiStats;
    private List<MonthlyStats> monatlicheStats;
    private List<HealthMetric> gesundheitsMetriken;
    private Map<String, Integer> erfolgsquoten;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RauchfreiStats {
        private int tage;
        private int längsteSerie;
        private int durchschnittProTag;
        private double gesamtErsparnis;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MonthlyStats {
        private String monat;
        private int zigaretten;
        private double ausgaben;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HealthMetric {
        private String name;
        private int wert;
        private int maxWert;
    }
} 