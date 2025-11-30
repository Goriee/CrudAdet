# 🚀 Deployment Guide - CrudAdet Frontend to Vercel

This guide will help you deploy your React frontend to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your backend API running at: `https://crudadet.onrender.com`

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Code to GitHub

1. Initialize git in the frontend folder (if not already done):
```bash
cd frontend
git init
git add .
git commit -m "Initial commit - frontend"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if deploying from monorepo) OR leave as `.` (if frontend is root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

Your app will be live in 1-2 minutes! 🎉

## Method 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Run the deploy command:
```bash
vercel
```

4. Follow the interactive prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `crudadet-frontend` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. For production deployment:
```bash
vercel --prod
```

## Configuration Files

The following files are already configured for Vercel:

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures React Router works correctly with client-side routing.

## Post-Deployment

### Testing Your Deployment

1. Visit your Vercel URL (e.g., `https://crudadet-frontend.vercel.app`)
2. Test the following:
   - ✅ Register a new account
   - ✅ Login with credentials
   - ✅ Create a new position
   - ✅ Edit an existing position
   - ✅ Delete a position
   - ✅ Logout

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check that all dependencies are installed:
```bash
npm install
```

2. Test the build locally:
```bash
npm run build
```

3. Check the Vercel deployment logs for specific errors

### API Connection Issues

If the frontend can't connect to the backend:

1. Verify the backend is running at `https://crudadet.onrender.com`
2. Test the API directly:
```bash
curl https://crudadet.onrender.com/auth/login
```

3. Check browser console for CORS errors
4. Ensure your backend has CORS enabled for your Vercel domain

### React Router 404 Errors

If you get 404 errors on page refresh:
- Ensure `vercel.json` is present in the frontend directory
- Verify the rewrites configuration is correct

## Environment Variables (If Needed)

If you want to use environment variables:

1. Create `.env.local` in frontend folder:
```env
VITE_API_URL=https://crudadet.onrender.com
```

2. Update `src/api.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://crudadet.onrender.com';
```

3. In Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add `VITE_API_URL` with value `https://crudadet.onrender.com`

## Update/Redeploy

To update your deployed app:

1. Make changes to your code
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

3. Vercel automatically deploys the new version!

Or using CLI:
```bash
vercel --prod
```

## Monitoring

- **Analytics**: Enable Vercel Analytics in your project settings
- **Logs**: View deployment and function logs in Vercel dashboard
- **Performance**: Use Vercel Speed Insights for performance monitoring

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)
- React Router Documentation: [reactrouter.com](https://reactrouter.com)

## Success Checklist

- ✅ Code pushed to GitHub
- ✅ Project created on Vercel
- ✅ Build successful
- ✅ Deployment live
- ✅ Login/Register working
- ✅ CRUD operations functional
- ✅ Routing works correctly

Congratulations! Your frontend is now live on Vercel! 🎉
