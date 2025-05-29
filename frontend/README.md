# CareerCompassAI Frontend

This directory contains the frontend application for CareerCompassAI, built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Query** - Data fetching and caching
- **Vite** - Build tool
- **Vitest** - Testing framework

## Directory Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
│   ├── common/       # Shared components (buttons, inputs, etc.)
│   ├── layout/       # Layout components (header, footer, etc.)
│   └── features/     # Feature-specific components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API services and external integrations
├── store/            # Global state management
├── styles/           # Global styles and Tailwind config
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main App component
└── main.tsx          # Entry point
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Design System

The application follows a consistent design system with:

- Color palette defined in the Tailwind configuration
- Reusable components for buttons, inputs, cards, etc.
- Responsive design breakpoints
- Typography rules

See the `tailwind.config.js` file for theme configuration details.