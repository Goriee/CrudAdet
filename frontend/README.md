# CrudAdet Frontend

A modern React frontend application for managing positions with authentication.

## Features

- 🔐 User Authentication (Login/Register)
- ✨ Position Management (CRUD Operations)
- 🎨 Beautiful UI with Tailwind CSS
- 🚀 Fast development with Vite
- 📱 Responsive Design
- 🔒 Protected Routes with JWT Authentication

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API Client

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the frontend folder:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and your app will be deployed!

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Set the root directory to `frontend`
6. Click "Deploy"

### Environment Variables

No environment variables needed! The API URL is already configured to use your Render backend:
`https://crudadet.onrender.com`

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   │   └── PrivateRoute.tsx
│   ├── pages/       # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── api.ts       # API configuration
│   ├── App.tsx      # Main app component
│   ├── main.tsx     # Entry point
│   └── index.css    # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json      # Vercel configuration
```

## API Endpoints Used

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Positions (Protected)
- `GET /positions` - Get all positions
- `POST /positions` - Create position
- `PATCH /positions/:id` - Update position
- `DELETE /positions/:id` - Delete position

## Usage

1. **Register**: Create a new account on the register page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View, create, edit, and delete positions
4. **Logout**: Click the logout button to sign out

## Screenshots

The application includes:
- Clean login/register forms with validation
- Responsive dashboard with data table
- Modal forms for creating/editing positions
- Error handling and loading states
- Professional UI with Tailwind CSS

## Backend

This frontend connects to the NestJS backend deployed at:
`https://crudadet.onrender.com`

## License

MIT
