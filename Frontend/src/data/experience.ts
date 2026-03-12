export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "OCTRION GmbH (formerly KOCO Solutions)",
    period: "01/2026 - Present",
    location: "Darmstadt, Germany",
    description: [
      "Developed a scalable Micro-frontend architecture using React 19, Syncfusion, Vite, and Module Federation.",
      "Engineered a high-performance .NET 9.0 Web API using OData and Entity Framework Core with PostgreSQL.",
      "Utilized asynchronous event-driven communication using RabbitMQ and background processing with .NET Hosted Services.",
      "Optimized application performance through Redis caching and TanStack Query server-state management.",
      "Enforced strict type safety across the full stack using TypeScript on the frontend and C# on the backend.",
    ],
    techStack: [
      "React 19",
      "Vite",
      ".NET 9.0",
      "Micro-frontends",
      "RabbitMQ",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "OCTRION GmbH",
    period: "01/2023 - 12/2025",
    location: "Darmstadt, Germany",
    description: [
      "Maintained a dynamic frontend using React 18, Material UI, and Redux Toolkit.",
      "Collaborated on a Symfony (PHP) backend using Doctrine ORM to handle data and support RESTful API services.",
      "Managed secure authentication and user access flows using OAuth2, JWT, and Google 2FA.",
      "Worked with advanced data visualization and mapping tools including Ag-Grid, ApexCharts, and Leaflet GIS.",
      "Utilized Docker-based containerization with Nginx and RabbitMQ.",
    ],
    techStack: [
      "React 18",
      "Material UI",
      "Redux Toolkit",
      "Symfony",
      "Docker",
      "Ag-Grid",
    ],
  },
  {
    id: 3,
    role: "Frontend Developer - Werkstudent",
    company: "Videoboost",
    period: "08/2021 - 08/2022",
    location: "Darmstadt, Germany",
    description: [
      "Development of a web application in React (TypeScript).",
      "User interface design and user experience improvement.",
      "Implementation of new features and refinement of existing features.",
      "Worked with ReactJS, TypeScript, NextJS, HTML, SCSS, CSS, Material UI and GitHub.",
    ],
    techStack: ["React", "TypeScript", "Next.js", "Material UI", "SCSS"],
  },
  {
    id: 4,
    role: "Frontend Developer - Internship",
    company: "Jomigo",
    period: "06/2021 - 08/2021",
    location: "Berlin, Germany",
    description: [
      "Implementing new features to company's website.",
      "Fixing and removing bugs.",
      "Set up authorization cookie.",
    ],
    techStack: ["Frontend Development", "Bug Fixing", "Authorization"],
  },
  {
    id: 5,
    role: "Web Developer - Internship",
    company: "Next Web Lines",
    period: "06/2016 - 08/2016",
    location: "Islamabad, Pakistan",
    description: [
      "Worked with React, JavaScript, HTML, SCSS, CSS, GitHub and MongoDB.",
    ],
    techStack: ["React", "JavaScript", "MongoDB", "SCSS"],
  },
];
