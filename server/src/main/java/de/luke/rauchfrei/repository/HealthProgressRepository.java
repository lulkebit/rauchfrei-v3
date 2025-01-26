package de.luke.rauchfrei.repository;

import de.luke.rauchfrei.model.HealthProgress;
import de.luke.rauchfrei.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthProgressRepository extends JpaRepository<HealthProgress, Long> {
    List<HealthProgress> findByUser(User user);
} 