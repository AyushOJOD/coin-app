# Frontend - Blockchain Block Explorer

A modern Next.js application for displaying and monitoring blockchain blocks in real-time.

## 🚀 Features

- **Real-time Block Monitoring**: Live updates of blockchain blocks with configurable refresh intervals
- **Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Blockchain Integration**: Uses Ethers.js for blockchain interactions
- **GraphQL Support**: Integrates with GraphQL APIs for data fetching
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Blockchain**: Ethers.js v6
- **Data Fetching**: GraphQL Request
- **Linting**: ESLint with Next.js config

## 📦 Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── transfers/     # Transfer-related endpoints
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── BlocksHeader.tsx   # Header with controls
│   └── BlocksList.tsx     # Block list display
├── hooks/                 # Custom React hooks
│   └── useBlocks.ts       # Block data management
├── types/                 # TypeScript type definitions
│   └── block.ts           # Block data types
└── utils/                 # Utility functions
    └── classNames.ts      # CSS class utilities
```

## 🔧 Configuration

The application uses:

- **Tailwind CSS v4** for styling with PostCSS
- **TypeScript** for type safety
- **ESLint** for code quality
- **Next.js** with Turbopack for fast development

## 🌐 API Integration

The frontend communicates with the backend API for:

- Fetching block data (`/api/blocks`)
- Triggering block fetching (`/api/fetch-blocks`)
- Retrieving transfer data (`/api/transfers`)

## 🎨 UI Components

### BlocksHeader

- Pause/resume functionality for real-time updates
- Manual refresh button
- Loading state indicators

### BlocksList

- Displays block information in a clean, organized format
- Shows block number, timestamp, hash, and transaction count
- Handles loading and error states

## 🔄 Real-time Updates

The application uses a custom hook (`useBlocks`) that:

- Fetches blocks at configurable intervals (default: 1000ms)
- Provides pause/resume functionality
- Handles manual refresh operations
- Manages loading and error states

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 📝 Environment Variables

Make sure to configure the following environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API URL (if different from default)

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Run `npm run lint` before committing
4. Test your changes thoroughly

## 📄 License

This project is part of the blockchain block explorer application.
