# Professional Portfolio

A full-stack, multilingual portfolio application featuring a .NET 9 Web API backend and a high-performance React frontend.

## 🚀 Live Demo
*[Link to your hosted portfolio if available]*

## 🛠 Tech Stack

### Backend
- **Core:** .NET 9 Web API
- **Database:** PostgreSQL with Entity Framework Core
- **Messaging:** MailKit & MimeKit (SMTP integration for contact form)
- **Features:**
  - Automated Database Seeding (English & German)
  - RESTful API Architecture
  - Swagger/OpenAPI documentation

### Frontend
- **Core:** React 18 + TypeScript + Vite
- **Styling:** Material UI (MUI) & Tailwind CSS
- **Animations:** Framer Motion (for smooth transitions and timeline effects)
- **Localization:** i18next (supports English & German)
- **State Management:** React Context API (Theme & Language management)

## ✨ Key Features
- **Dynamic Timeline:** Smoothly animated professional experience and project timeline.
- **Multilingual Support:** Fully translated interface (English and German).
- **Contact System:** Integrated contact form that stores messages in DB and sends real-time email notifications.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Dark/Light Mode:** Full theme support with persistent user preference.
- **Resume Download:** Automated endpoint to serve and download the latest CV.

## 📦 Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js (v18+)
- PostgreSQL

### Backend Setup
1. Navigate to the Backend folder: `cd Backend`
2. Update `appsettings.json` with your database and SMTP credentials.
3. Run migrations: `dotnet ef database update`
4. Start the server: `dotnet run --project Portfolio.API`

### Frontend Setup
1. Navigate to the Frontend folder: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 📁 Project Structure
```text
Portfolio/
├── Backend/                # .NET 9 Web API
│   ├── Portfolio.API/      # Controllers, Services, Data
│   └── Portfolio.sln
├── Frontend/               # React + TypeScript
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── services/       # API Integration
│   │   └── i18n/           # Translations
└── README.md
```

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
Created by [Jamil Ur Rehman](https://github.com/jamilahmadzai)
