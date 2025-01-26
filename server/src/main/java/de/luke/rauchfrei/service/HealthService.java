package de.luke.rauchfrei.service;

import de.luke.rauchfrei.dto.HealthProgressResponse;
import de.luke.rauchfrei.dto.HealthProgressResponse.HealthMetric;
import de.luke.rauchfrei.dto.HealthProgressResponse.UserHealthStats;
import de.luke.rauchfrei.model.User;
import de.luke.rauchfrei.model.HealthProgress;
import de.luke.rauchfrei.repository.UserRepository;
import de.luke.rauchfrei.repository.HealthProgressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class HealthService {

    private final UserRepository userRepository;
    private final HealthProgressRepository healthProgressRepository;

    @Transactional(readOnly = true)
    public HealthProgressResponse getHealthProgress(String userEmail) {
        try {
            log.debug("Suche Benutzer mit E-Mail: {}", userEmail);
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> {
                        log.error("Benutzer nicht gefunden: {}", userEmail);
                        return new RuntimeException("Benutzer nicht gefunden: " + userEmail);
                    });
            log.debug("Benutzer gefunden: {}", user.getUsername());

            LocalDateTime quitDate = user.getRauchfreiSeit();
            if (quitDate == null) {
                log.info("Kein Rauchstopp-Datum für Benutzer: {}", userEmail);
                return createEmptyResponse(user);
            }

            long daysSinceQuit = ChronoUnit.DAYS.between(quitDate, LocalDateTime.now());
            log.info("Berechne Gesundheitsfortschritt für Benutzer: {}, Tage seit Rauchstopp: {}", userEmail, daysSinceQuit);

            List<HealthProgress> healthProgress = healthProgressRepository.findByUser(user);
            log.debug("Gefundene Gesundheitseinträge: {}", healthProgress.size());

            HealthProgressResponse response = HealthProgressResponse.builder()
                    .shortTerm(calculateShortTermProgress(daysSinceQuit))
                    .longTerm(calculateLongTermProgress(daysSinceQuit))
                    .permanentDamage(calculatePermanentDamage(user.getRauchdauerJahre()))
                    .userStats(buildUserStats(user))
                    .build();

            log.debug("Gesundheitsdaten erfolgreich berechnet für Benutzer: {}", userEmail);
            return response;

        } catch (Exception e) {
            log.error("Fehler beim Abrufen der Gesundheitsdaten für Benutzer: {}", userEmail, e);
            throw new RuntimeException("Fehler beim Abrufen der Gesundheitsdaten: " + e.getMessage());
        }
    }

    private UserHealthStats buildUserStats(User user) {
        return UserHealthStats.builder()
                .alter(user.getAlter())
                .rauchdauerJahre(user.getRauchdauerJahre())
                .vorerkrankungen(user.getVorerkrankungen())
                .koerpergewicht(user.getKoerpergewicht())
                .sportAktivitaet(user.getSportAktivitaet())
                .build();
    }

    private List<HealthMetric> calculateShortTermProgress(long daysSinceQuit) {
        List<HealthMetric> metrics = new ArrayList<>();

        // 20 Minuten: Herzfrequenz normalisiert sich
        metrics.add(createMetric(
            "Herzfrequenz",
            Math.min(100, (daysSinceQuit * 24 * 60) / 20.0 * 100),
            100.0,
            "BPM",
            "Ihre Herzfrequenz normalisiert sich",
            false,
            "20 Minuten"
        ));

        // 24 Stunden: Kohlenmonoxid abgebaut
        metrics.add(createMetric(
            "Kohlenmonoxid-Abbau",
            Math.min(100, (daysSinceQuit * 24) / 24.0 * 100),
            100.0,
            "%",
            "Kohlenmonoxid wird aus Ihrem Körper abgebaut",
            false,
            "24 Stunden"
        ));

        // 48-72 Stunden: Geschmacks- und Geruchssinn verbessert
        metrics.add(createMetric(
            "Geschmacks- und Geruchssinn",
            Math.min(100, (daysSinceQuit * 24) / 72.0 * 100),
            100.0,
            "%",
            "Ihr Geschmacks- und Geruchssinn verbessert sich",
            false,
            "72 Stunden"
        ));

        return metrics;
    }

    private List<HealthMetric> calculateLongTermProgress(long daysSinceQuit) {
        List<HealthMetric> metrics = new ArrayList<>();

        // 2-12 Wochen: Durchblutung verbessert sich
        metrics.add(createMetric(
            "Durchblutung",
            Math.min(100, (daysSinceQuit) / 84.0 * 100),
            100.0,
            "%",
            "Ihre Durchblutung verbessert sich",
            false,
            "12 Wochen"
        ));

        // 1-9 Monate: Lungenkapazität erhöht sich
        metrics.add(createMetric(
            "Lungenkapazität",
            Math.min(100, (daysSinceQuit) / 270.0 * 100),
            100.0,
            "%",
            "Ihre Lungenkapazität erhöht sich",
            false,
            "9 Monate"
        ));

        // 1 Jahr: Herzinfarktrisiko halbiert
        metrics.add(createMetric(
            "Herzinfarktrisiko-Reduktion",
            Math.min(100, (daysSinceQuit) / 365.0 * 100),
            100.0,
            "%",
            "Ihr Herzinfarktrisiko reduziert sich",
            false,
            "1 Jahr"
        ));

        return metrics;
    }

    private List<HealthMetric> calculatePermanentDamage(Integer rauchdauerJahre) {
        if (rauchdauerJahre == null || rauchdauerJahre < 5) {
            return new ArrayList<>();
        }

        List<HealthMetric> metrics = new ArrayList<>();

        // Berechnung des permanenten Schadens basierend auf der Rauchdauer
        double damagePercentage = Math.min(100, rauchdauerJahre * 2.0);

        metrics.add(createMetric(
            "Lungengewebe",
            damagePercentage,
            100.0,
            "%",
            "Potenzielle dauerhafte Schädigung des Lungengewebes",
            true,
            null
        ));

        if (rauchdauerJahre >= 10) {
            metrics.add(createMetric(
                "COPD-Risiko",
                Math.min(100, rauchdauerJahre * 3.0),
                100.0,
                "%",
                "Erhöhtes Risiko für chronisch obstruktive Lungenerkrankung (COPD)",
                true,
                null
            ));
        }

        return metrics;
    }

    private HealthMetric createMetric(
            String name,
            Double currentValue,
            Double maxValue,
            String unit,
            String description,
            Boolean isPermanentDamage,
            String expectedRecovery
    ) {
        return HealthMetric.builder()
                .metricName(name)
                .currentValue(currentValue)
                .maxValue(maxValue)
                .unit(unit)
                .description(description)
                .isPermanentDamage(isPermanentDamage)
                .expectedRecoveryDate(expectedRecovery)
                .build();
    }

    private HealthProgressResponse createEmptyResponse(User user) {
        return HealthProgressResponse.builder()
                .shortTerm(new ArrayList<>())
                .longTerm(new ArrayList<>())
                .permanentDamage(new ArrayList<>())
                .userStats(UserHealthStats.builder()
                        .alter(user.getAlter())
                        .rauchdauerJahre(user.getRauchdauerJahre())
                        .vorerkrankungen(user.getVorerkrankungen())
                        .koerpergewicht(user.getKoerpergewicht())
                        .sportAktivitaet(user.getSportAktivitaet())
                        .build())
                .build();
    }
} 