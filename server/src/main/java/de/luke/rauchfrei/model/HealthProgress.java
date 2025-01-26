package de.luke.rauchfrei.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "metric_name", nullable = false)
    private String metricName;

    @Column(name = "current_value")
    private Double currentValue;

    @Column(name = "max_value")
    private Double maxValue;

    @Column(name = "unit")
    private String unit;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "achievement_date")
    private LocalDateTime achievementDate;

    @Column(name = "is_permanent_damage")
    private Boolean isPermanentDamage;

    @Column(name = "recovery_start_date")
    private LocalDateTime recoveryStartDate;

    @Column(name = "expected_recovery_date")
    private LocalDateTime expectedRecoveryDate;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
} 