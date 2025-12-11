# Frontend Deployment Guide

## Changes Made for Azure Deployment

### 1. **web.config** (NEW)
Created `web.config` file for Azure App Service (Windows/IIS) to properly route requests to Node.js Express server.

### 2. **config.js** (NEW)
Created `public/config.js` to manage API URLs:
- **Development**: Uses `http://localhost:5000/api`
- **Production**: Uses Azure backend URL (needs to be updated)

**⚠️ IMPORTANT**: Update the `PRODUCTION_API_URL` in `public/config.js` with your actual backend URL:
```javascript
const PRODUCTION_API_URL = 'https://your-backend-app.azurewebsites.net/api';
```

### 3. **Updated Deployment Workflow**
Fixed `.github/workflows/frontend-deploy.yml`:
- Removed React-specific build steps (your app is Express + static HTML)
- Now deploys the entire app directory (server.js, public/, node_modules/, web.config)
- Removed incorrect API URL references

### 4. **Completed Dashboard Page**
The `dashboard.html` was incomplete - now fully functional with:
- User information display
- Navigation to profile
- Logout functionality

## How to Deploy

### Option 1: Automatic Deployment (GitHub Actions)
1. **Update Backend URL** in `public/config.js`
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Updated frontend for Azure deployment"
   git push origin main
   ```
3. GitHub Actions will automatically deploy to Azure

### Option 2: Manual Deployment
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Create a ZIP package:
   ```bash
   # Windows PowerShell
   Compress-Archive -Path * -DestinationPath frontend-deploy.zip -Force
   ```

3. Deploy via Azure Portal:
   - Go to your App Service
   - Click "Deployment Center"
   - Upload the ZIP file

## Testing Your Deployment

### 1. Check if Frontend is Running
Visit: `https://usermanagementservices-frontend-atbzdze6fubebyb4.centralindia-01.azurewebsites.net`

You should see the landing page with:
- "Welcome to User Management System" heading
- Login and Sign Up buttons

### 2. Check API Configuration
Open browser console (F12) and look for:
```
API Configuration: { environment: 'Production', apiUrl: '...' }
```

### 3. Test User Flow
1. Click "Sign Up" → Register a new user
2. Click "Login" → Login with your credentials
3. Check Dashboard → Should show your username
4. Go to Profile → Fill in your details

## Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution**: Update `PRODUCTION_API_URL` in `public/config.js` with your actual backend URL

### Issue: "404 Not Found" on routes
**Solution**: Ensure `web.config` is present in the deployment package

### Issue: "Application Error" on Azure
**Solution**: 
1. Check Azure logs: App Service → Monitoring → Log stream
2. Verify Node.js version matches (18.x)
3. Check if `server.js` is at the root level

### Issue: Pages load but API calls fail
**Solution**: 
1. Verify backend is running
2. Check CORS settings in backend `app.py`
3. Verify backend URL in `config.js`

## Environment Variables (Optional)
You can also set API URL via Azure App Service settings:
1. Go to Configuration → Application settings
2. Add: `API_URL` = `https://your-backend-url/api`
3. Modify `config.js` to read from this variable

## Local Development

To run locally:
```bash
# Start backend first (in backend directory)
python app.py

# Then start frontend (in frontend directory)
npm start
```

Visit: `http://localhost:3000`

## Next Steps

1. ✅ Update `public/config.js` with your backend URL
2. ✅ Commit and push changes
3. ✅ Wait for GitHub Actions deployment
4. ✅ Test your application on Azure
5. ✅ Monitor logs for any issues
