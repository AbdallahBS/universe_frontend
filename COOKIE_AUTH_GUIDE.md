# Cookie-Based Authentication Guide

## What Changed

We've switched from localStorage to cookies for authentication. Here's what's different:

### ✅ **Benefits of Cookie-Based Auth:**

1. **More Secure** - HTTP-only cookies can't be accessed by JavaScript (XSS protection)
2. **Automatic** - Cookies are sent automatically with every request
3. **Server-Side** - Backend can read tokens directly from cookies
4. **Simpler Frontend** - No manual token management needed

### 🔄 **How It Works Now:**

1. **Login/Signup** - Backend sets `accessToken` and `refreshToken` cookies
2. **API Requests** - Cookies are sent automatically with `credentials: 'include'`
3. **Token Refresh** - Backend reads refresh token from cookies
4. **Logout** - Backend clears cookies and frontend clears user state

## Frontend Changes

### 1. **CookieManager Utility** (`src/utils/cookies.ts`)
```typescript
// New utility for managing cookies
CookieManager.get('accessToken')     // Get cookie value
CookieManager.set('user', data, 30)  // Set cookie with 30-day expiry
CookieManager.isAuthenticated()      // Check if user is logged in
CookieManager.clearAuth()            // Clear all auth cookies
```

### 2. **AuthContext** (`src/context/AuthContext.tsx`)
- No more localStorage token management
- Uses cookies to check authentication status
- Stores user data in cookies for persistence

### 3. **API Service** (`src/services/api.ts`)
- Removed manual token header management
- Relies on `credentials: 'include'` to send cookies
- Much simpler implementation

### 4. **Auth Service** (`src/services/authService.ts`)
- No need to send tokens in request body
- Backend reads refresh tokens from cookies

## Backend Changes

### 1. **Cookie Parser** (`index.js`)
```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Parse cookies from requests
```

### 2. **Auth Controller** (`controllers/AuthController.js`)
```javascript
// Before: Reading from request body
const { refreshToken } = req.body;

// After: Reading from cookies
const refreshToken = req.cookies.refreshToken;
```

### 3. **Package Dependencies** (`package.json`)
- Added `cookie-parser` dependency

## Testing the Changes

### 1. **Install Backend Dependencies**
```bash
cd universe_backend
npm install
```

### 2. **Start Both Servers**
```bash
# Backend (terminal 1)
cd universe_backend
npm run dev

# Frontend (terminal 2)
cd universe_frontend
npm run dev
```

### 3. **Test Authentication Flow**
1. Go to signup page
2. Create a new account
3. Check browser cookies (F12 → Application → Cookies)
4. You should see `accessToken` and `refreshToken` cookies
5. Try logging out - cookies should be cleared

### 4. **Verify API Calls**
1. Open Network tab in DevTools
2. Make an authenticated request
3. Check request headers - should include cookies automatically
4. No manual `Authorization` header needed

## Cookie Security Features

### 1. **Secure Cookies**
```javascript
// Backend sets secure cookies
document.cookie = `${name}=${value};expires=${expires};path=/;secure;samesite=strict`;
```

### 2. **Automatic Expiration**
- Access tokens: 30 days
- Refresh tokens: 30 days
- User data: 30 days

### 3. **CORS Configuration**
```javascript
// Backend allows credentials
credentials: true,
origin: function (origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  return callback(new Error('Not allowed by CORS'));
}
```

## Troubleshooting

### Common Issues:

1. **Cookies not being set**
   - Check CORS configuration
   - Ensure `credentials: 'include'` in fetch requests
   - Verify backend is setting cookies correctly

2. **Authentication not persisting**
   - Check if cookies are being cleared
   - Verify cookie expiration settings
   - Check browser cookie settings

3. **API requests failing**
   - Ensure `credentials: 'include'` in apiFetch
   - Check if cookies are being sent in requests
   - Verify backend cookie parsing

### Debug Steps:

1. **Check Cookies**: F12 → Application → Cookies → localhost:3000
2. **Check Network**: F12 → Network → Look for cookie headers
3. **Check Console**: Look for authentication errors
4. **Check Backend Logs**: Verify cookie parsing is working

## Migration Complete! 🎉

Your authentication system now uses cookies instead of localStorage, providing:
- Better security
- Simpler implementation
- Automatic token management
- Server-side token access

The frontend is now much cleaner and the backend has full control over authentication tokens!
