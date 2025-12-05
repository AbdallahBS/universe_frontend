import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';

const root = createRoot(document.getElementById('root')!);

const isStrictMode = import.meta.env.VITE_NODE_ENV === 'development';
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const AppWrapper = (
  <GoogleOAuthProvider clientId={googleClientId}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);

root.render(
  isStrictMode ? <StrictMode>{AppWrapper}</StrictMode> : AppWrapper
);
