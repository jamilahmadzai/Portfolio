using Portfolio.API.Models;

namespace Portfolio.API.Data;

public static class Seeder
{
    public static void Seed(PortfolioDbContext context)
    {
        context.Experiences.RemoveRange(context.Experiences);
        context.Projects.RemoveRange(context.Projects);
        context.SaveChanges();

        if (!context.Experiences.Any())
        {
            context.Experiences.AddRange(new List<Experience>
            {
                new Experience
                {
                    Role = "Software Engineer",
                    RoleDe = "Softwareentwickler",
                    Company = "OCTRION GmbH (formerly KOCO Solutions)",
                    Period = "01/2026 - 04/2026",
                    PeriodDe = "01/2026 - 04/2026",
                    Location = "Darmstadt, Germany",
                    LocationDe = "Darmstadt, Deutschland",
                    Description = new List<string>
                    {
                       "Improved API response times through strategic Redis caching and OData query optimization.",
                       "Architected a modular micro-frontend system using React 19 and Vite, streamlining build and deployment workflows.",
                       "Engineered high-performance .NET 9.0 APIs serving enterprise telemetry data with consistently low latency.",
                       "Built robust event-driven workflows with RabbitMQ, ensuring reliable execution of mission-critical background tasks.",
                       "Enforced full-stack type safety across multiple modules using TypeScript and C# shared data contracts."
                    },
                    DescriptionDe = new List<string>
                    {
                       "Verbesserung der API-Antwortzeiten durch strategisches Redis-Caching und OData-Optimierung.",
                       "Architektur eines modularen Micro-Frontend-Systems mit React 19 und Vite zur Optimierung von Build- und Deployment-Workflows.",
                       "Entwicklung von Hochleistungs-.NET 9.0-APIs für Unternehmens-Telemetriedaten mit durchgehend niedrigen Latenzzeiten.",
                       "Aufbau robuster ereignisgesteuerter Workflows mit RabbitMQ für zuverlässige Hintergrundaufgaben.",
                       "Durchsetzung vollständiger Full-Stack-Typsicherheit in mehreren Modulen mit TypeScript und C#."
                    },
                    TechStack = new List<string> { "React 19", "Vite", ".NET 9.0", "C#", "TypeScript", "Micro-frontends", "RabbitMQ", "PostgreSQL", "Redis" }
                },
                new Experience
                {
                    Role = "Frontend Developer",
                    RoleDe = "Frontend-Entwickler",
                    Company = "OCTRION GmbH (formerly KOCO Solutions)",
                    Period = "01/2023 - 12/2025",
                    PeriodDe = "01/2023 - 12/2025",
                    Location = "Darmstadt, Germany",
                    LocationDe = "Darmstadt, Deutschland",
                    TechStack = new List<string> { "React 18", "TypeScript", "Material UI", "Redux Toolkit", "Symfony (PHP)", "Ag-Grid", "ApexCharts", "Leaflet GIS", "Docker" },
                    Description = new List<string>
                    {
                        "Maintained a dynamic frontend using React 18, Material UI, and Redux Toolkit for efficient state management and UI consistency.",
                        "Collaborated on a Symfony (PHP) backend using Doctrine ORM to handle data persistence and support RESTful API services.",
                        "Managed secure authentication and user access flows using OAuth2, JWT, and Google 2FA.",
                        "Worked with advanced data visualization and mapping tools including Ag-Grid, ApexCharts, and Leaflet GIS.",
                        "Utilized Docker-based containerization with Nginx and RabbitMQ to ensure stable and consistent development environments."
                    },
                    DescriptionDe = new List<string>
                    {
                        "Pflegte ein dynamisches Frontend mit React 18, Material UI und Redux Toolkit für effizientes State-Management und UI-Konsistenz.",
                        "Arbeitete am Symfony (PHP)-Backend mit Doctrine ORM zur Datenpersistenz und Unterstützung von RESTful-API-Diensten.",
                        "Verwaltete sichere Authentifizierungs- und Zugriffsabläufe mit OAuth2, JWT und Google 2FA.",
                        "Arbeitete mit fortgeschrittenen Datenvisualisierungs- und Kartierungstools, darunter Ag-Grid, ApexCharts und Leaflet GIS.",
                        "Nutzte Docker-basierte Containerisierung mit Nginx und RabbitMQ für stabile und konsistente Entwicklungsumgebungen."
                    }
                },
                new Experience
                {
                    Role = "Frontend Developer (Werkstudent)",
                    RoleDe = "Frontend-Entwickler (Werkstudent)",
                    Company = "Vedioboost GmbH",
                    Period = "08/2021 - 08/2022",
                    PeriodDe = "08/2021 - 08/2022",
                    Location = "Darmstadt, Germany",
                    LocationDe = "Darmstadt, Deutschland",
                    TechStack = new List<string> { "React", "TypeScript", "Next.js", "Material UI", "SCSS", "GitHub" },
                    Description = new List<string>
                    {
                        "Developed a web application in React (TypeScript), building reusable components and managing application state.",
                        "Improved user interface design and user experience across key application flows.",
                        "Implemented new features and refined existing functionality based on product requirements.",
                        "Worked with ReactJS, TypeScript, Next.js, HTML, SCSS, CSS, Material UI and GitHub."
                    },
                    DescriptionDe = new List<string>
                    {
                        "Entwickelte eine Webanwendung in React (TypeScript), baute wiederverwendbare Komponenten und verwaltete den Anwendungszustand.",
                        "Verbesserte User Interface Design und User Experience in wichtigen Anwendungsabläufen.",
                        "Implementierte neue Funktionen und verfeinerte bestehende Funktionalitäten basierend auf Produktanforderungen.",
                        "Arbeitete mit ReactJS, TypeScript, Next.js, HTML, SCSS, CSS, Material UI und GitHub."
                    }
                },
                new Experience
                {
                    Role = "Frontend Developer - Internship",
                    RoleDe = "Frontend-Entwickler - Praktikum",
                    Company = "Jomigo Gmbh",
                    Period = "06/2021 - 08/2021",
                    PeriodDe = "06/2021 - 08/2021",
                    Location = "Berlin, Germany",
                    LocationDe = "Berlin, Deutschland",
                    Description = new List<string>
                    {
                        "Implemented new features on the company's customer-facing website.",
                        "Identified and resolved frontend bugs, improving overall stability.",
                        "Configured authorization cookie handling for user session management."
                    },
                    DescriptionDe = new List<string>
                    {
                        "Implementierung neuer Funktionen auf der Unternehmenswebsite.",
                        "Identifizierung und Behebung von Frontend-Fehlern zur Verbesserung der Stabilität.",
                        "Konfiguration von Autorisierungs-Cookies für das Benutzersitzungsmanagement."
                    },
                    TechStack = new List<string> { "Frontend Development", "Bug Fixing", "Authorization" }
                },
                new Experience
                {
                    Role = "Web Developer - Internship",
                    RoleDe = "Webentwickler - Praktikum",
                    Company = "Next Web Lines, Web and Design Solutions",
                    Period = "06/2016 - 08/2016",
                    PeriodDe = "06/2016 - 08/2016",
                    Location = "Islamabad, Pakistan",
                    LocationDe = "Islamabad, Pakistan",
                    Description = new List<string>
                    {
                        "Worked with React, JavaScript, HTML, SCSS, CSS, GitHub and MongoDB."
                    },
                    DescriptionDe = new List<string>
                    {
                        "Arbeit mit React, JavaScript, HTML, SCSS, CSS, GitHub und MongoDB."
                    },
                    TechStack = new List<string> { "React", "JavaScript", "MongoDB", "SCSS" }
                }
            });
            context.SaveChanges();
        }

        if (context.Skills.Any())
        {
            context.Skills.RemoveRange(context.Skills);
            context.SaveChanges();
        }

        if (!context.Skills.Any())
        {
            context.Skills.AddRange(new List<Skill>
            {
                // Application Layer (Primary)
                new Skill { Name = "React 19", Category = "Application Layer", IconName = "FaReact", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 5, UsageContext = "Core framework for high-performance micro-frontends.", UsageContextDe = "Kern-Framework für Hochleistungs-Micro-Frontends." },
                new Skill { Name = "Next.js", Category = "Application Layer", IconName = "SiNextdotjs", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 4, UsageContext = "SSR/ISR for SEO-critical enterprise applications.", UsageContextDe = "SSR/ISR für SEO-kritische Unternehmensanwendungen." },
                new Skill { Name = "TypeScript", Category = "Application Layer", IconName = "SiTypescript", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 5, UsageContext = "Strict typing across full-stack architectures.", UsageContextDe = "Strikte Typisierung über Full-Stack-Architekturen hinweg." },
                new Skill { Name = "Redux Toolkit", Category = "Application Layer", IconName = "SiRedux", Tier = "Supporting", Proficiency = "Expert", YearsOfExperience = 4, UsageContext = "Complex global state orchestration.", UsageContextDe = "Komplexe globale Zustands-Orchestrierung." },
                new Skill { Name = "Tailwind", Category = "Application Layer", IconName = "SiTailwindcss", Tier = "Supporting", Proficiency = "Expert", YearsOfExperience = 3, UsageContext = "Rapid UI development with utility-first CSS.", UsageContextDe = "Schnelle UI-Entwicklung mit Utility-First-CSS." },
                new Skill { Name = "Material UI", Category = "Application Layer", IconName = "SiMui", Tier = "Specialized", Proficiency = "Expert", YearsOfExperience = 4, UsageContext = "Custom theme engineering and component libraries.", UsageContextDe = "Custom Theme Engineering und Komponentenbibliotheken." },
                new Skill { Name = "Framer Motion", Category = "Application Layer", IconName = "SiFramer", Tier = "Specialized", Proficiency = "Expert", YearsOfExperience = 2, UsageContext = "High-end production animations.", UsageContextDe = "High-End-Produktionsanimationen." },

                // Backend & APIs
                new Skill { Name = "C#", Category = "Backend & APIs", IconName = "SiCsharp", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 8, UsageContext = "Main language for robust enterprise backends.", UsageContextDe = "Hauptsprache für robuste Enterprise-Backends." },
                new Skill { Name = ".NET 9.0", Category = "Backend & APIs", IconName = "SiDotnet", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 6, UsageContext = "Architecting scalable web APIs and services.", UsageContextDe = "Architektur von skalierbaren Web-APIs und Services." },
                new Skill { Name = "Symfony", Category = "Backend & APIs", IconName = "SiSymfony", Tier = "Supporting", Proficiency = "Advanced", YearsOfExperience = 3, UsageContext = "PHP-based enterprise service development.", UsageContextDe = "PHP-basierte Enterprise-Service-Entwicklung." },
                
                // Data & Messaging
                new Skill { Name = "PostgreSQL", Category = "Data & Messaging", IconName = "SiPostgresql", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 5, UsageContext = "Relational modeling and performance tuning.", UsageContextDe = "Relationale Modellierung und Performance-Tuning." },
                new Skill { Name = "RabbitMQ", Category = "Data & Messaging", IconName = "SiRabbitmq", Tier = "Primary", Proficiency = "Advanced", YearsOfExperience = 3, UsageContext = "Message-driven asynchronous architectures.", UsageContextDe = "Nachrichtengesteuerte asynchrone Architekturen." },
                new Skill { Name = "Redis", Category = "Data & Messaging", IconName = "SiRedis", Tier = "Supporting", Proficiency = "Advanced", YearsOfExperience = 3, UsageContext = "Distributed caching and real-time locking.", UsageContextDe = "Verteiltes Caching und Echtzeit-Sperren." },
                
                // Specialized tools moved to Application Layer
                new Skill { Name = "Syncfusion", Category = "Application Layer", IconName = "Syncfusion", Tier = "Specialized", Proficiency = "Expert", YearsOfExperience = 3, UsageContext = "Complex enterprise data grids and charts.", UsageContextDe = "Komplexe Enterprise-Datengitter und Diagramme." },
                new Skill { Name = "Leaflet GIS", Category = "Application Layer", IconName = "SiLeaflet", Tier = "Specialized", Proficiency = "Advanced", YearsOfExperience = 3, UsageContext = "Custom interactive mapping solutions.", UsageContextDe = "Benutzerdefinierte interaktive Kartenlösungen." },

                // Infrastructure
                new Skill { Name = "Docker", Category = "Infrastructure", IconName = "FaDocker", Tier = "Primary", Proficiency = "Advanced", YearsOfExperience = 4, UsageContext = "Containerization and local dev orchestration.", UsageContextDe = "Containerisierung und lokale Entwicklungs-Orchestrierung." },
                new Skill { Name = "Nginx", Category = "Infrastructure", IconName = "SiNginx", Tier = "Supporting", Proficiency = "Advanced", YearsOfExperience = 3, UsageContext = "Reverse proxying and load balancing.", UsageContextDe = "Reverse Proxying und Lastverteilung." },
                new Skill { Name = "Git/GitHub", Category = "Infrastructure", IconName = "FaGitAlt", Tier = "Primary", Proficiency = "Expert", YearsOfExperience = 8, UsageContext = "CI/CD and collaborative development workflows.", UsageContextDe = "CI/CD und kollaborative Entwicklungs-Workflows." }
            });
            context.SaveChanges();
        }

        if (context.Educations.Any())
        {
            context.Educations.RemoveRange(context.Educations);
            context.SaveChanges();
        }

        if (!context.Educations.Any())
        {
            context.Educations.AddRange(new List<Education>
            {
                new Education
                {
                    Degree = "Master of Science in Computer Science",
                    DegreeDe = "Master of Science in Informatik",
                    Institution = "University Of Paderborn",
                    InstitutionDe = "Universität Paderborn",
                    Period = "03/2020 - Present",
                    PeriodDe = "03/2020 - Heute",
                    Location = "Paderborn, Germany",
                    LocationDe = "Paderborn, Deutschland",
                    Focus = "AI Systems, Intelligent Embedded Systems & Software Quality",
                    FocusDe = "KI-Systeme, Intelligente Eingebettete Systeme & Softwarequalität",
                    Description = "Project Phase: Engaged in high-impact research projects, including a major Project Group on 'Artificial Intelligence for Systems Engineering'.",
                    DescriptionDe = "Projektphase: Beteiligung an hochwirksamen Forschungsprojekten, einschließlich einer großen Projektgruppe zu 'Künstlicher Intelligenz für Systems Engineering'.",
                    RelevantModules = new List<string> { 
                        "AI for Systems Engineering", 
                        "Algorithms for Complex Virtual Scenes",
                        "Software Quality Assurance", 
                        "Intelligent Embedded Systems",
                        "Planning and Heuristic Search",
                        "Computational Argumentation"
                    }
                },
                new Education
                {
                    Degree = "Bachelor of Software Engineering",
                    DegreeDe = "Bachelor in Software Engineering",
                    Institution = "Bahria University Islamabad",
                    InstitutionDe = "Bahria University Islamabad",
                    Period = "09/2012 - 09/2016",
                    PeriodDe = "09/2012 - 09/2016",
                    Location = "Islamabad, Pakistan",
                    LocationDe = "Islamabad, Pakistan",
                    Focus = "Software Design & Architecture, Formal Methods, Real-time Systems",
                    FocusDe = "Softwaredesign & -architektur, Formale Methoden, Echtzeitsysteme",
                    Description = "Graduated with CGPA 3.06/4.00. Completed 134 credit hours with core expertise in high-concurrency systems and architectural patterns.",
                    DescriptionDe = "Abschluss mit CGPA 3,06/4,00. 134 Credit Hours absolviert mit Kernkompetenz in High-Concurrency-Systemen und Architekturmustern.",
                    RelevantModules = new List<string> { "Software Quality Engineering", "Database Management Systems", "Artificial Intelligence", "Analysis of Algorithms", "Object Oriented Programming" }
                }
            });
            context.SaveChanges();
        }

        if (!context.Projects.Any())
        {
            context.Projects.AddRange(new List<Project>
            {
                new Project
                {
                    Title = "Vehicle Cockpit & Live Telemetry Dashboard",
                    TitleDe = "Fahrzeug-Cockpit & Live-Telemetrie-Dashboard",
                    Organization = "OCTRION GmbH",
                    Description = "Real-time telemetry cockpit for diverse fleets with conditional widget rendering and role-based access control.",
                    DescriptionDe = "Echtzeit-Telemetrie-Cockpit für diverse Fahrzeugflotten mit bedingtem Widget-Rendering und rollenbasierter Zugriffskontrolle.",
                    ArchitectureDescription = "React / Redux Toolkit | ApexCharts | Leaflet | Framer Motion",
                    ArchitectureDescriptionDe = "React / Redux Toolkit | ApexCharts | Leaflet | Framer Motion",
                    ArchitectureImpact = "Consolidated heterogeneous telemetry data into an adaptive interface, providing unified operational visibility across vehicle types.",
                    ArchitectureImpactDe = "Konsolidierung heterogener Telemetriedaten in einer adaptiven Oberfläche für eine einheitliche Betriebsübersicht über alle Fahrzeugtypen.",
                    Features = new List<string> {
                        "Adaptive Widget Grid: Dynamic rendering of specific telemetry (Fuel, Battery, Hydraulic) based on vehicle type and permissions.",
                        "Live Telemetry Cards: Real-time status for connectivity, GPS location, and health summaries with Red/Yellow/Green indicators.",
                        "ApexCharts Sparklines: High-speed charts for mileage, fuel consumption, and energy fill levels with historical signal history."
                    },
                    FeaturesDe = new List<string> {
                        "Adaptives Widget-Raster: Dynamisches Rendering spezifischer Telemetrie (Kraftstoff, Batterie, Hydraulik) nach Fahrzeugtyp.",
                        "Live-Telemetriekarten: Echtzeit-Status für Konnektivität, GPS und Gesundheit mit Rot/Gelb/Grün-Indikatoren.",
                        "ApexCharts Sparklines: Hochleistungsdiagramme für Kilometerstand, Verbrauch und Füllstände mit Signalhistorie."
                    },
                    TechStack = new List<string> { "React", "Redux Toolkit", "ApexCharts", "Leaflet", "Framer Motion", "MUI" },
                    IsInternalProject = true
                },
                new Project
                {
                    Title = "High-Performance Logistics GIS Engine",
                    TitleDe = "Logistik-GIS-Engine für Hochleistung",
                    Organization = "OCTRION GmbH",
                    Description = "Enterprise fleet GIS platform for real-time telemetry tracking, route analysis, and spatial heatmaps.",
                    DescriptionDe = "Unternehmens-GIS-Plattform für Echtzeit-Telemetrie-Tracking, Routenanalyse und räumliche Heatmaps.",
                    ArchitectureDescription = "React / Redux Toolkit | Leaflet GIS | ApexCharts | Redux Saga | Framer Motion",
                    ArchitectureDescriptionDe = "React / Redux Toolkit | Leaflet GIS | ApexCharts | Redux Saga | Framer Motion",
                    ArchitectureImpact = "Replaced manual route tracking with automated spatial insights and configurable heatmap analysis.",
                    ArchitectureImpactDe = "Ersetzte manuelles Routen-Tracking durch automatisierte räumliche Einblicke und konfigurierbare Heatmap-Analysen.",
                    Features = new List<string> {
                        "Live GPS Tracking: Interactive map for the entire fleet with unit-specific drill-downs and real-time filtering.",
                        "Dual-Mode Heatmap: GIS engine supporting Deep and Smart scans with configurable density thresholds and tour-based filtering.",
                        "Multi-Telemetry Dashboard: Centralized view for fuel levels, energy fill, and working hours tailored to vehicle type."
                    },
                    FeaturesDe = new List<string> {
                        "Live-GPS-Tracking: Interaktive Karte für die gesamte Flotte mit einheiten-spezifischem Drill-down und Echtzeit-Filtern.",
                        "Dual-Mode Heatmap: GIS-Engine für Deep- und Smart-Scans mit konfigurierbaren Schwellenwerten und Tour-Filtern.",
                        "Multi-Telemetrie-Dashboard: Zentralisierte Ansicht für Füllstände und Betriebsstunden, angepasst an den Fahrzeugtyp."
                    },
                    TechStack = new List<string> { "React", "Redux Toolkit", "Leaflet GIS", "ApexCharts", "Framer Motion", "Redux Saga" },
                    IsInternalProject = true
                },
                new Project
                {
                    Title = "Fleet Maintenance & Lifecycle Platform",
                    TitleDe = "Flottenwartungs- & Lebenszyklus-Plattform",
                    Organization = "OCTRION GmbH",
                    Description = "Mission-critical platform for fleet health monitoring, digital service management, and asset lifecycle orchestration.",
                    DescriptionDe = "Geschäftskritische Plattform für Flottengesundheits-Monitoring, digitales Servicemanagement und Asset-Lebenszyklus.",
                    ArchitectureDescription = ".NET 9.0 Web APIs | React 19 | Syncfusion | MUI DataGrid Pro | PostgreSQL | OData",
                    ArchitectureDescriptionDe = ".NET 9.0 Web APIs | React 19 | Syncfusion | MUI DataGrid Pro | PostgreSQL | OData",
                    ArchitectureImpact = "Digitized paper-based maintenance into structured workflows with real-time health visibility for operators and service centers.",
                    ArchitectureImpactDe = "Digitalisierung papierbasierter Wartung in strukturierte Workflows mit Echtzeit-Gesundheitsübersicht.",
                    Features = new List<string> {
                        "Service Dashboard: Multi-column health indicators across 11 telemetry points with automatic critical alert sorting.",
                        "Digital Ticket Lifecycle: End-to-end service request management with automated nearest service center assignment.",
                        "Fleet Administration: Configurable reporting tables, real-time error counts, and multi-tenant role management."
                    },
                    FeaturesDe = new List<string> {
                        "Service-Dashboard: Gesundheitsindikatoren über 11 Telemetrie-Spalten mit automatischer Priorisierung kritischer Alarme.",
                        "Digitaler Ticket-Lebenszyklus: End-to-End-Servicemanagement mit automatischer Zuweisung des nächsten Servicezentrums.",
                        "Flottenverwaltung: Konfigurierbare Berichte, Echtzeit-Fehlerzähler und mandantenfähige Rollenverwaltung."
                    },
                    TechStack = new List<string> { "React 19", ".NET 9.0", "Syncfusion", "MUI DataGrid Pro", "PostgreSQL", "OData", "JWT" },
                    IsInternalProject = true
                },
                new Project
                {
                    Title = "Enterprise AI Data Classification Platform",
                    TitleDe = "KI-Datenklassifizierungsplattform für Unternehmen",
                    Organization = "OCTRION GmbH",
                    Description = "High-throughput labeling platform for AI training sets using advanced drag-and-drop orchestration.",
                    DescriptionDe = "Hochdurchsatz-Labeling-Plattform für KI-Trainingssätze mit fortschrittlicher Drag-and-Drop-Orchestrierung.",
                    ArchitectureDescription = "react-beautiful-dnd | Redux Saga | Framer Motion | Fragment Memoization",
                    ArchitectureDescriptionDe = "react-beautiful-dnd | Redux Saga | Framer Motion | Fragment Memoization",
                    ArchitectureImpact = "Accelerated AI training cycles through high-performance data labeling and parallel orchestration.",
                    ArchitectureImpactDe = "Beschleunigung von KI-Trainingszyklen durch Hochleistungs-Datenlabeling und parallele Orchestrierung.",
                    Features = new List<string> {
                        "High-Performance DnD: Zero-latency orchestration of massive datasets using optimized state transitions.",
                        "Confidence Feedback: Real-time visual indicators for AI classification shifts during user interaction.",
                        "Virtualized Hierarchies: Instant rendering and interaction for deeply nested hierarchical data structures."
                    },
                    FeaturesDe = new List<string> {
                        "Hochleistungs-DnD: Latenzfreie Orchestrierung massiver Datensätze durch optimierte Zustandsübergänge.",
                        "Konfidenz-Feedback: Visuelle Echtzeit-Indikatoren für KI-Klassifizierungsänderungen während der Interaktion.",
                        "Virtualisierte Hierarchien: Sofortiges Rendering und Interaktion für tief verschachtelte hierarchische Daten."
                    },
                    TechStack = new List<string> { "React 19", "Redux", "react-beautiful-dnd", "Framer Motion", "MUI" },
                    IsInternalProject = true
                },
                new Project
                {
                    Title = "Adaptive Identity & Access Governance",
                    TitleDe = "Adaptive Identitäts- & Zugriffssteuerung",
                    Organization = "OCTRION GmbH",
                    Description = "Secure MFA-driven Identity Provider with stateless session management and device fingerprinting for anti-fraud.",
                    DescriptionDe = "Sicherer MFA-basierter Identity Provider mit zustandslosem Session-Management und Anti-Fraud-Fingerprinting.",
                    ArchitectureDescription = "Symfony PHP | JWT + 2FA | Hybrid Fingerprinting | Doctrine ORM",
                    ArchitectureDescriptionDe = "Symfony PHP | JWT + 2FA | Hybrid Fingerprinting | Doctrine ORM",
                    ArchitectureImpact = "Hardened security for large-scale user profiles, reducing fraudulent session attempts via device fingerprinting.",
                    ArchitectureImpactDe = "Stärkung der Sicherheit für Profile im großen Maßstab und Reduzierung von Betrugsversuchen.",
                    Features = new List<string> {
                        "Hybrid Fingerprinting: Reliably detects identity duplication across anonymous and incognito browser sessions.",
                        "Multi-Tab Sync: Dual-TTL heartbeat system synchronized across tabs to prevent session hijacking.",
                        "Automated Auditing: High-volume processing of daily authentication events for regulatory compliance logs."
                    },
                    FeaturesDe = new List<string> {
                        "Hybrides Fingerprinting: Zuverlässige Erkennung von Identitätsduplikaten über anonyme Browser-Sitzungen.",
                        "Multi-Tab-Synchronisation: Dual-TTL-Heartbeat-System zur Verhinderung von Session-Hijacking über mehrere Tabs.",
                        "Automatisierte Audits: Hochvolumige Verarbeitung von Authentifizierungs-Events für Compliance-Logs."
                    },
                    TechStack = new List<string> { "Symfony", "JWT", "FingerprintJS", "Google 2FA", "PostgreSQL", "Doctrine ORM" },
                    IsInternalProject = true
                }

            });
            context.SaveChanges();
        }
    }
}
