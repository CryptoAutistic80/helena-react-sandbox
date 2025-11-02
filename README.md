# React Three.js Interactive Landing Page

An interactive 3D landing page built with React, TypeScript, Vite, and React Three Fiber. Features two interactive GLB models that respond to mouse hover and clicks with smooth, physics-based animations.

## Quick Start Guide

Hi Helena! 👋 Here's how to get this project running on your computer:

### Prerequisites

Before you begin, make sure you have these installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project folder**
   ```bash
   cd my-react-sandbox
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   This will download all the packages needed for the project. It might take a minute or two.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - You should see a message in your terminal like: `Local: http://localhost:5173/`
   - Open that URL in your web browser
   - You should see the landing page with two 3D models!

### What to Expect

Once running, you'll see:
- A landing page with two 3D cube models
- **Hover** over a model: it will smoothly scale up and follow your mouse
- **Click** a model: it will spin and float with physics-based animation
- You can drag to rotate the camera view

### Troubleshooting

**Problem: "npm: command not found"**
- Make sure Node.js is installed. Check by running: `node --version`

**Problem: Port 5173 is already in use**
- Vite will automatically try a different port (5174, 5175, etc.)
- Check your terminal for the actual URL

**Problem: Dependencies won't install**
- Try deleting the `node_modules` folder and `package-lock.json`, then run `npm install` again

### Available Scripts

- `npm run dev` - Start development server (what you'll use most)
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Check code for errors

---

## Project Details

This is a React + TypeScript + Vite project with React Three Fiber for 3D graphics.

### Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpful utilities for React Three Fiber
- **Three.js** - 3D graphics library

### Features

- Interactive 3D models loaded from GLB files
- Physics-based animations with spring systems
- Mouse-following behavior
- Smooth hover and click interactions
- Full 3D camera controls

### File Structure

```
src/
  components/
    Scene.tsx          # Main 3D scene setup
    OrbitingModel.tsx  # Interactive 3D model component
  assets/
    newartcube.glb     # 3D model files
    newartcube2.glb
  App.tsx              # Main landing page component
  App.css              # Landing page styles
```

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
