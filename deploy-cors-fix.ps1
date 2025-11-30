# Enable CORS and Deploy to Render
Write-Host "🔧 Enabling CORS in backend..." -ForegroundColor Green

# Navigate to project root
Set-Location -Path "c:\Users\Administrator\Desktop\CrudAdet"

# Check git status
Write-Host "`n📋 Current git status:" -ForegroundColor Cyan
git status

# Add changes
Write-Host "`n➕ Adding changes..." -ForegroundColor Yellow
git add src/main.ts

# Commit
Write-Host "`n💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Enable CORS for frontend access"

# Push to trigger Render deployment
Write-Host "`n🚀 Pushing to GitHub (will trigger Render deployment)..." -ForegroundColor Green
git push origin main

Write-Host "`n✅ Done! Render will auto-deploy in 2-3 minutes." -ForegroundColor Green
Write-Host "   Check deployment status at: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host "`n⏰ Wait 3 minutes, then try registration again!" -ForegroundColor Yellow
