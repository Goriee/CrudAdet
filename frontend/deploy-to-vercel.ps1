# Quick Vercel CLI Deployment

# Step 1: Install Vercel CLI (run once)
npm install -g vercel

# Step 2: Navigate to frontend folder
cd frontend

# Step 3: Login to Vercel
vercel login

# Step 4: Deploy
vercel

# When prompted:
# - Set up and deploy? → Y
# - Which scope? → (select your account)
# - Link to existing project? → N
# - Project name? → crudadet-frontend (or press Enter)
# - In which directory is your code? → ./ (press Enter)
# - Want to override settings? → N

# Step 5: Deploy to production
vercel --prod
