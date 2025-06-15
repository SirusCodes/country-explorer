# **App Name**: Country Explorer

## Core Features:

- Project Setup: Set up Next.js project with TypeScript and a clean, well-organized project structure.
- User Authentication: Implement a mock authentication system with login and logout functionality, storing authentication status in the application's state (e.g., React Context).
- Country Listing: Display a list of countries with flag, common name, population, region, and capital, fetched from the REST Countries API.
- Country Detail: Create a dynamic route to display detailed information for a single country including flag, common name, native name, population, region, sub region, capital(s), top level domain(s), currency/currencies, and language(s).
- Border Countries: Display common names of border countries as links that navigate to the respective country's detail page.
- Search and Filter: Implement client-side search by common name and region filter on the homepage.
- Favorite Countries: Allow authenticated users to mark countries as favorites and persist the list across browser sessions using Local Storage, managing the state globally.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to evoke a sense of trust, stability, and exploration.
- Background color: Light gray (#F0F2F5), a very low saturation version of the primary hue, to ensure a clean, readable layout.
- Accent color: A contrasting orange (#FF9800) to highlight interactive elements.
- Body and headline font: 'Inter', a sans-serif, providing a modern, neutral look for both headlines and body text.
- Use flat design icons to represent regions and country details.
- Use subtle transitions and animations when navigating between pages and updating the UI.
