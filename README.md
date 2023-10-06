# Podcast Player 🎧 with React ⚛️ + Vite ⚡️ Application

💫 Discover and listen to your favorite podcasts, all in one place.

🎧 Check it online: <a href="https://molina-daniel.github.io/podcasts-player-react/" target="_blank">Podcast Player</a>

## Feature

- 🔎 Search podcasts on a topic of your choose.
- 📃 View podcast details.
- 🤓 Explore episodes.
- 🎧 Play audio content.

## Preview

![podcast player.png](https://lh3.googleusercontent.com/pw/ADCreHflJaoa0ORoSXPh4S5EC5XvZZH0s8w8-GRG44Tjx_jFDzpGUhTvQ5gaa94hHikntbJrMP2wvSsFW2QQnI3uo3FDtp8ePpyiicY24OZ-SC9IF9MbvGSDKYTyY1cD8FkZTBwoW31Mj8O8prf8Gye1rQU2=w1333-h934-s-no?authuser=0)

## Getting Started

To start and run the app locally:

```bash
npm install

npm run dev
```

And browse to the url given in the console (eg: http://localhost:5173/podcasts-player-react/)

### Prerequisites

- `node.js` and `npm` (Node Package Manager) should be installed on your machine.

## Technologies Used

Main technologies and libraries used in the project:

- react.js v18
- react-router-dom v6.15.0
- zustand v4.4.2
- axios v1.5.0
- mui/material v5.14.8
- tailwindcss v3.3.3

## Main Files and Components

- `assets/`: This folder contains various assets used in the application, including logos, images, SVG files, and other resources.

- `components/`: Inside this directory, you will find all the reusable components used throughout the application. These components are designed to be modular and can be easily integrated into different views.

- `pages/`: The `pages/` directory is where the main view components of the application reside. Each page represents a specific view or route of the application. For example, you might have pages like `MainSection`, `PodcastDetails`, and `PodcastSearch`.

- `store/`: Within the `store/` folder, you'll find the `store.js` file, which is responsible for managing global states using Zustand. This central state management ensures that data can be shared and accessed consistently across different components.

- Other project-related files and folders that you might find in the root directory include configuration files (e.g., `.env` for environment variables), the `public/` directory for static assets, and the `src/` directory where the main application code is located.

## 7. API Integration

The app uses the public and free iTunes Search API to fetch the podcast and episodes data.

## 8. Styling

The styles are customized using a combination of the MaterialUI and TailwindCSS libraries.
The `theme.js` file the `src` folder manage global styles and overrides on the default styles.

## 9. State Management

The global states are managed by the Zustand library. The `store.js` file contains all the variables and logic on this.
Local states in the componentes are managed by react hooks like `useState`.
