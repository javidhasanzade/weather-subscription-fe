# Weather Subscription Web App

Weather Subscription Web App is a modern weather application built with Next.js, leveraging server-side rendering (SSR) and React Server Components (RSC) for optimal performance. It provides users with real-time weather updates, forecasts, and interactive UI components.

## Features

- **Real-Time Weather Data**: Fetches accurate weather information for any location.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Interactive Components**: Includes features like sunrise/sunset cards, weather cards, and more.
- **Theming Support**: Dynamic theming using `next-themes`.
- **Form Handling**: Integrated with `react-hook-form` for seamless form validation.
- **State Management**: Utilizes TanStack Query for efficient data fetching and caching.

## Tech Stack

- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Validation**: Zod
- **Icons**: Lucide React
- **Utilities**: clsx, class-variance-authority

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/javidhasanzade/weather-subscription-fe.git
   cd weather-subscription-fe
   ```

2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the production build.
- `npm run lint`: Lints the codebase.

## Folder Structure

```
weather-subscription-fe/
├── .next/                # Build artifacts
├── src/
│   ├── actions/          # Server-side actions
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   ├── pages/            # Next.js pages
│   ├── styles/           # Global styles
│   └── info.ts           # Application constants
├── public/               # Static assets
├── README.md             # Project documentation
└── package.json          # Project metadata and dependencies
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TanStack Query](https://tanstack.com/query)
