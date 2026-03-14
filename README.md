# Professional Portfolio

A full-stack, multilingual portfolio application featuring a .NET 9 Web API backend and a high-performance React 19 frontend.

## 🚀 Live Demo
[jamilahmadzai.com](https://jamilahmadzai.com)

## 🛠 Tech Stack

### Backend

- **Core:** .NET 9 Web API
- **Database:** PostgreSQL (Neon/Railway compatible)
- **Messaging:** Resend API (Modern email delivery)
- **Features:**
  - Automated Database Seeding (English & German)
  - RESTful API Architecture
  - Swagger/OpenAPI documentation
  - Graceful error handling for email services

### Frontend

- **Core:** React 19 + TypeScript + Vite
- **Styling:** Material UI (MUI) & Tailwind CSS 4
- **Animations:** Framer Motion
- **Localization:** i18next (supports English & German)
- **State Management:** React Context API

## ✨ Key Features

- **Dynamic Timeline:** Smoothly animated professional experience and project timeline.
- **Multilingual Support:** Fully translated interface (English and German).
- **Contact System:** Integrated contact form that stores messages in DB and sends notifications via Resend.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Dark/Light Mode:** Full theme support with persistent user preference.
- **Resume Download:** Automated endpoint to serve and download the latest CV directly from the browser.

## 📦 Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js (v20+)
- PostgreSQL

### Backend Setup

1. Navigate to the Backend folder: `cd Backend`
2. Update `appsettings.json` with your database connection string and Resend API Key.
3. The database will automatically migrate and seed on the first run.
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
├── Frontend/               # React 19 + TypeScript
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── services/       # API Integration
│   │   └── i18n/           # Translations
└── README.md
```

## 📄 License

This project is licensed under the MIT License.

---

Created by [Jamil Ur Rehman](https://github.com/jamilahmadzai)
