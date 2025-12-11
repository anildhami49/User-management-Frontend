// API Configuration
// Change this to your actual backend URL when deployed to production
// For local development, it will use localhost:5000

// Production Backend URL - UPDATE THIS with your actual Azure backend URL
const PRODUCTION_API_URL = 'https://your-backend-app.azurewebsites.net/api';

// Detect if running on Azure (production) or locally
const isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1';

// Set the API base URL
window.API_BASE_URL = isProduction ? PRODUCTION_API_URL : 'http://localhost:5000/api';

console.log('API Configuration:', {
  environment: isProduction ? 'Production' : 'Development',
  apiUrl: window.API_BASE_URL
});
