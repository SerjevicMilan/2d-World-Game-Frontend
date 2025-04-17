# 2D World Game – Frontend

 **Live Demo:** [https://alenas.netlify.app/]

This is the React-based frontend for the 2D World Generation Game. It visually renders the tile-based world and communicates with the backend to update the game state in real-time.

## Features

- Grid-based 2D tile rendering
- Player movement with arrow keys or on-screen buttons
- Coins, enemies, walls, and background
- Mobile support with touch controls
- Game status: running, won, lost
- Button to recreate the world and restart the game

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Configuration

Create a `.env` file in the root of `frontend/`:

```
VITE_API_URL=http://localhost:8080
```

## Folder Structure

```
src/
  ├── components/        # Game entities and UI
  ├── hooks/             # Custom React hooks
  ├── utils/             # Screen config and helpers
  ├── assets/            # Game graphics
  ├── App.tsx            # Main app layout
  └── main.tsx           # App entry point
```

## API

The frontend communicates with the backend through REST APIs.
