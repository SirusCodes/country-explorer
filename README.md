# Country Explorer

A Next.js app to explore countries, view details, and manage favorites with authentication.

---

## Setup & Run Instructions

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd country-explorer
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   ```
3. **Run the development server:**
   ```sh
   yarn dev
   ```
   The app will be available at [http://localhost:9002](http://localhost:9002).

---

## Credentials for Mock Login

- **Username:** `user`
- **Password:** `password`

---

## Design Choices, Assumptions, and SSG/SSR Explanation

- **Authentication:**

  - Simple cookie-based mock authentication is used. The `countryExplorerAuth` cookie is set on login and checked in middleware for protected routes.
  - Middleware (`src/middleware.ts`) restricts access to authenticated users except for public paths (login, home, API routes, etc).

- **Routing & Data Fetching:**

  - **Country list and details** use **Incremental Static Regeneration (ISR)** for fast load times and SEO. Country data is fetched once and a static page is generated which is cached with validity for a day.
  - **Favorites** and user-specific data use **Client-Side Rendering (CSR)**, as they depend on the authenticated user does not requires SEO and already pretty light weight.
  - **Login/logout** handled via API routes (`/api/login`, `/api/logout`).

- **UI/UX:**

  - Built with React and Tailwind CSS for a modern, responsive interface.
  - Components are modular and reusable.

- **Assumptions:**
  - No real backend; authentication and data are mocked for demo purposes.
  - All users share the same country data; favorites are stored in client state only.

---

## State Management Solution

**React Context API** is used for global state management:

This approach is lightweight and sufficient for the app's needs, avoiding the complexity of external libraries like Redux/Zustand.
