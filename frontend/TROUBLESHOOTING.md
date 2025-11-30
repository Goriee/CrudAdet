# Backend Connection Troubleshooting

## Current Issue: Network Error

The error "Error: Network Error" means the frontend cannot connect to your backend at:
**https://crudadet.onrender.com**

## Possible Causes

### 1. **Backend is in Cold Start** 🥶
Render's free tier puts apps to sleep after 15 minutes of inactivity.
- **First request can take 30-60 seconds** to wake up
- **Solution**: Wait 30-60 seconds and try again

### 2. **Backend is Down** ❌
Your backend might not be running.
- **Check**: Visit https://crudadet.onrender.com/auth/login in your browser
- **Expected**: Should show something (even an error is good - means it's running)
- **Problem**: If it times out or shows nothing, backend is down

### 3. **CORS Not Configured** 🚫
Backend might not allow requests from localhost:3001
- **Solution**: Backend needs to allow CORS from all origins in development

### 4. **Database Connection Issue** 🗄️
Backend might be running but can't connect to MySQL database
- **Check**: Backend logs on Render dashboard

## Quick Fixes to Try

### Fix 1: Wait for Cold Start
1. Open a new tab: https://crudadet.onrender.com
2. Wait 30-60 seconds
3. Refresh and try registration again

### Fix 2: Check Backend CORS Settings
Make sure your NestJS backend has CORS enabled in `main.ts`:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins in development
    credentials: true,
  });
  
  await app.listen(3000);
}
```

### Fix 3: Check Backend is Running
1. Go to your Render dashboard
2. Check if the service is running
3. Check the logs for errors

### Fix 4: Test Backend Manually
Open your browser console (F12) and run:

```javascript
fetch('https://crudadet.onrender.com/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'testuser', password: 'test123' })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.log('Error:', e));
```

## What to Check Right Now

1. **Open a new tab** and visit: https://crudadet.onrender.com
   - Does it load? (even a 404 or error means it's working)
   - Or does it timeout?

2. **Check browser console** (F12 → Console tab)
   - Look for detailed error messages
   - Check the Network tab to see what's happening

3. **Try different username**
   - Maybe "admin" exists
   - Try: "user123" or "testuser456"

## Next Steps

After checking the above:

1. If backend is sleeping → Wait 60 seconds, then try again
2. If backend is down → Restart it on Render
3. If CORS error → Update backend CORS settings
4. If still not working → Check backend logs on Render

**Most likely cause**: Backend is in cold start. Just wait 60 seconds! ⏰
