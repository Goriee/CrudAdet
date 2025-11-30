# 🚀 CrudAdet - Full Stack Application

A complete full-stack CRUD application with NestJS backend and React frontend.

## 📁 Project Structure

```
CrudAdet/
├── backend (root)          # NestJS Backend - Deployed on Render
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── positions/     # Positions CRUD module
│   │   ├── guards/        # JWT authentication guards
│   │   └── ...
│   └── ...
│
└── frontend/              # React + TypeScript Frontend - Deploy on Vercel
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Login, Register, Dashboard
    │   ├── api.ts         # API configuration
    │   └── ...
    ├── vercel.json        # Vercel configuration
    └── DEPLOYMENT.md      # Deployment instructions
```

## 🌐 Live Deployment

- **Backend API**: https://crudadet.onrender.com
- **Frontend**: Deploy to Vercel (see instructions below)

## ⚡ Quick Start - Frontend

### Option 1: PowerShell Script (Windows)
```powershell
.\start-frontend.ps1
```

### Option 2: Manual
```bash
cd frontend
npm install
npm run dev
```

The app will open at http://localhost:3000

## 🎨 Features

### Authentication
- ✅ User Registration with email (optional)
- ✅ Secure Login with JWT
- ✅ Password encryption with bcrypt
- ✅ Protected routes

### Position Management
- ✅ Create new positions
- ✅ View all positions in a table
- ✅ Update existing positions
- ✅ Delete positions
- ✅ Real-time CRUD operations

### UI/UX
- ✅ Beautiful gradient designs
- ✅ Responsive layout (mobile-friendly)
- ✅ Modal forms for create/edit
- ✅ Loading states
- ✅ Error handling with notifications
- ✅ Smooth animations

## 📦 Tech Stack

### Backend (NestJS)
- NestJS 11
- TypeScript
- MySQL Database
- JWT Authentication
- Bcrypt Password Hashing
- Passport.js

### Frontend (React)
- React 18
- TypeScript
- Vite (Lightning-fast build tool)
- Tailwind CSS
- React Router v6
- Axios

## 🚀 Deploy Frontend to Vercel

### Step 1: Prepare Your Code

The frontend is already configured and ready to deploy!

### Step 2: Deploy

**Method A: Vercel Dashboard**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Set **Root Directory** to `frontend`
6. Click "Deploy"

**Method B: Vercel CLI**

```bash
cd frontend
npm install -g vercel
vercel
```

### Step 3: Done! 🎉

Your app will be live at: `https://your-project-name.vercel.app`

📖 See detailed instructions in `frontend/DEPLOYMENT.md`

## 📝 API Endpoints

### Authentication
```
POST /auth/signup      - Register new user
POST /auth/login       - Login user
```

### Positions (Protected)
```
GET    /positions      - Get all positions
POST   /positions      - Create position
GET    /positions/:id  - Get single position
PATCH  /positions/:id  - Update position
DELETE /positions/:id  - Delete position
```

## 🎯 Usage Flow

1. **Register** → Create your account
2. **Login** → Sign in to access dashboard
3. **Dashboard** → View positions table
4. **Create** → Add new positions
5. **Edit** → Update existing positions
6. **Delete** → Remove positions
7. **Logout** → Secure sign out

## 🔧 Development

### Run Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```

### Test Production Build
```bash
cd frontend
npm run preview
```

## 📸 Screenshots

Backend API examples in `screenshot/` folder:
- Login API
- Register API
- POST request
- PATCH request

## 🔑 Environment Variables

### Backend (Already configured on Render)
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME
- JWT_SECRET

### Frontend
No environment variables needed! The API URL is already set to:
`https://crudadet.onrender.com`

## 🐛 Troubleshooting

### Frontend won't connect to backend?
1. Check if backend is running: https://crudadet.onrender.com
2. Open browser console (F12) to see errors
3. Verify CORS is enabled on backend

### Build errors?
```bash
cd frontend
rm -rf node_modules
npm install
npm run build
```

### Routing issues on Vercel?
The `vercel.json` file is already configured for client-side routing!

## 📚 Project Files

### Important Frontend Files
- `src/api.ts` - API configuration with axios interceptors
- `src/App.tsx` - Main app with routing
- `src/pages/Login.tsx` - Login page
- `src/pages/Register.tsx` - Registration page
- `src/pages/Dashboard.tsx` - Main CRUD interface
- `src/components/PrivateRoute.tsx` - Route protection
- `vercel.json` - Vercel deployment config
- `tailwind.config.js` - Tailwind CSS configuration

## 🎓 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## ⭐ Show Your Support

If you find this project helpful, please give it a star on GitHub!

---

**Ready to deploy?** 
1. ✅ Backend is live on Render
2. 🚀 Deploy frontend to Vercel
3. 🎉 Your app is online!

Made with ❤️ using NestJS, React, and TypeScript
