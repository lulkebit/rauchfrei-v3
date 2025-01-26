package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.StatisticsResponse;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserRepository userRepository;

    public StatisticsResponse getStatisticsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        return StatisticsResponse.builder()
                .rauchfreiStats(calculateRauchfreiStats(user))
                .monatlicheStats(calculateMonthlyStats(user))
                .gesundheitsMetriken(calculateHealthMetrics(user))
                .erfolgsquoten(calculateSuccessRates(user))
                .build();
    }

    private StatisticsResponse.RauchfreiStats calculateRauchfreiStats(User user) {
        LocalDate startDate = user.getQuitDate();
        long daysSinceQuit = ChronoUnit.DAYS.between(startDate, LocalDate.now());
        double savedMoney = daysSinceQuit * user.getDailyCigarettes() * 0.40; // Annahme: 0,40€ pro Zigarette

        return StatisticsResponse.RauchfreiStats.builder()
                .tage((int) daysSinceQuit)
                .längsteSerie((int) daysSinceQuit) // TODO: Implementiere Tracking für Rückfälle
                .durchschnittProTag(user.getDailyCigarettes())
                .gesamtErsparnis(savedMoney)
                .build();
    }

    private List<StatisticsResponse.MonthlyStats> calculateMonthlyStats(User user) {
        List<StatisticsResponse.MonthlyStats> stats = new ArrayList<>();
        LocalDate startDate = user.getQuitDate();
        LocalDate now = LocalDate.now();

        // Erstelle Statistiken für die letzten 6 Monate
        for (int i = 5; i >= 0; i--) {
            LocalDate date = now.minusMonths(i);
            String monthName = date.getMonth().toString().substring(0, 3);
            
            int cigarettes = date.isBefore(startDate) ? 
                    user.getDailyCigarettes() * date.lengthOfMonth() : 0;
            
            double expenses = cigarettes * 0.40;

            stats.add(StatisticsResponse.MonthlyStats.builder()
                    .monat(monthName)
                    .zigaretten(cigarettes)
                    .ausgaben(expenses)
                    .build());
        }

        return stats;
    }

    private List<StatisticsResponse.HealthMetric> calculateHealthMetrics(User user) {
        long daysSinceQuit = ChronoUnit.DAYS.between(user.getQuitDate(), LocalDate.now());
        
        return Arrays.asList(
            StatisticsResponse.HealthMetric.builder()
                    .name("Lungenfunktion")
                    .wert(calculateMetricValue(daysSinceQuit, 90))
                    .maxWert(100)
                    .build(),
            StatisticsResponse.HealthMetric.builder()
                    .name("Energielevel")
                    .wert(calculateMetricValue(daysSinceQuit, 75))
                    .maxWert(100)
                    .build(),
            StatisticsResponse.HealthMetric.builder()
                    .name("Stressresistenz")
                    .wert(calculateMetricValue(daysSinceQuit, 70))
                    .maxWert(100)
                    .build()
        );
    }

    private int calculateMetricValue(long days, int maxImprovement) {
        // Berechne einen Wert zwischen 50 und maxImprovement basierend auf den Tagen
        int baseValue = 50;
        int improvement = (int) Math.min(maxImprovement - baseValue, 
                                       (days * (maxImprovement - baseValue)) / 90.0);
        return baseValue + improvement;
    }

    private Map<String, Integer> calculateSuccessRates(User user) {
        // TODO: Implementiere tatsächliche Erfolgsquoten basierend auf Benutzerverhalten
        Map<String, Integer> rates = new HashMap<>();
        rates.put("morgens", 85);
        rates.put("mittags", 75);
        rates.put("abends", 90);
        rates.put("nachts", 95);
        return rates;
    }
} 