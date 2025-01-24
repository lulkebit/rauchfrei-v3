# 🚭 Rauchfrei App

Eine moderne Webanwendung zur Unterstützung beim Aufhören mit dem Rauchen. Die App hilft Nutzern dabei, ihre rauchfreie Zeit zu tracken, Erfolge zu visualisieren und motiviert zu bleiben.

## 🌟 Features

-   **Personalisiertes Dashboard** mit Überblick über wichtige Metriken
-   **Detaillierte Statistiken** zur Entwicklung des Rauchverhaltens
-   **Achievement-System** zur zusätzlichen Motivation
-   **Modernes UI** mit Glassmorphism-Design
-   **Responsive Design** für Desktop und Mobile
-   **Fortschritts-Tracking** mit visuellen Elementen

## 🛠 Technologie-Stack

### Frontend

-   React 18 mit Vite
-   TailwindCSS für Styling
-   React Router DOM für Navigation
-   ESLint für Code-Qualität

### Backend

-   Spring Boot 3.4
-   Spring Security mit JWT
-   PostgreSQL Datenbank
-   Maven als Build-Tool
-   Lombok für Boilerplate-Reduktion

## 🚀 Installation

### Voraussetzungen

-   Node.js (Version 18+)
-   Java 17
-   PostgreSQL

### Frontend Setup

```bash
cd app
npm install
npm run dev
```

### Backend Setup

```bash
cd server
./mvnw spring-boot:run
```

### Datenbank-Konfiguration

Passe die Datenbank-Einstellungen in `application.properties` an:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/rauchfrei
spring.datasource.username=dein_username
spring.datasource.password=dein_password
```

## 💻 Entwicklung

### Frontend Development Server

```bash
npm run dev
```

Der Server startet standardmäßig auf http://localhost:5173

### Backend Development

```bash
./mvnw spring-boot:run
```

Die API ist erreichbar unter http://localhost:8080

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📜 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert.

## 👥 Autoren

-   **Luke** - _Initiale Entwicklung_ - [GitHub](https://github.com/lulkebit)
