import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';

const root = createRoot(document.getElementById('root')!);

const isStrictMode = import.meta.env.VITE_NODE_ENV === 'development';

const AppWrapper = (
  <AuthProvider>
    <App />
  </AuthProvider>
);

root.render(
  isStrictMode ? <StrictMode>{AppWrapper}</StrictMode> : AppWrapper
);
