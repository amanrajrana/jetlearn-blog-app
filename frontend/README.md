# Frontend Project

## Description

This project serves as the frontend for a blogging platform, providing an intuitive user interface for managing blog posts, user authentication, and a personalized dashboard. Built with modern web development technologies, it is optimized for performance and maintainability.

---

### Reference

- **Backend**: [click here](../backend/readme.md)
- **API Collections (Postman)**: [Postman Collection](https://www.postman.com/red-moon-996043/workspace/jetlearn/)

---

## Features

- **User Authentication**: Secure login and registration functionality.
- **Blog Management**: Create, read, update, and delete (CRUD) blog posts.
- **User Dashboard**: Personalized dashboard for managing user content and preferences.
- **Responsive Design**: Mobile-friendly UI for seamless cross-device experience.

---

## Technologies Used

- **React.js**: Library for building user interfaces.
- **Vite**: Fast and modern development environment.
- **Redux**: State management for predictable application behavior.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN**: A component library for accessible and composable UI elements.
- **TypeScript**: Type safety and enhanced developer experience.

---

## Prerequisites

Ensure the following are installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)
- The [backend project](../backend/) should be running for API integration.

---

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/amanrajrana/jetlearn-blog-app.git
cd jetlearn-blog-app/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Base URL

Edit the `vite.config.ts` file to set the API base URL:

```ts
export default defineConfig({
  // ----
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"),
      },
    },
  },
});
```

---

## Usage

### Running the Application Locally

Start the development server:

```bash
npm run dev
```

---

### API Documentation

Access the API documentation through Postman:
[Postman Collection](https://www.postman.com/red-moon-996043/workspace/jetlearn/)

---

## Author

👤 **Aman Raj Rana**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amanrajrana)  
[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amanrajrana)

