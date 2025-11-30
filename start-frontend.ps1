# Navigate to frontend directory
Set-Location -Path "frontend"

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

# Start development server
Write-Host "`nStarting development server..." -ForegroundColor Green
Write-Host "The app will open at http://localhost:3000" -ForegroundColor Cyan
npm run dev
