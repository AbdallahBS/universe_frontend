import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useTheme } from '@context/ThemeContext';

const CustomToaster = () => {
  const { theme } = useTheme(); // Assuming you have a theme context
  const isDark = theme === 'dark';

  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(248, 250, 252, 0.9)', // slate-800/slate-50
          color: isDark ? 'rgb(248 250 252)' : 'rgb(15 23 42)', // slate-50/slate-900
          border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`, // slate-700/slate-200
          padding: '16px',
          borderRadius: '12px',
          boxShadow: isDark 
            ? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          backdropFilter: 'blur(12px)',
        },
        success: {
          iconTheme: {
            primary: 'rgb(20 184 166)', // teal-500
            secondary: isDark ? 'rgb(30 41 59)' : 'rgb(255 255 255)',
          },
          style: {
            background: isDark ? 'rgba(19, 78, 74, 0.3)' : 'rgba(240, 253, 250, 0.9)', // teal-900/30 : teal-50
            border: `1px solid ${isDark ? 'rgba(45, 212, 191, 0.3)' : 'rgb(153 246 228)'}`, // teal-400/teal-200
          },
        },
        error: {
          iconTheme: {
            primary: 'rgb(239 68 68)', // red-500
            secondary: isDark ? 'rgb(30 41 59)' : 'rgb(255 255 255)',
          },
          style: {
            background: isDark ? 'rgba(127, 29, 29, 0.3)' : 'rgba(254, 242, 242, 0.9)', // red-900/30 : red-50
            border: `1px solid ${isDark ? 'rgba(248, 113, 113, 0.3)' : 'rgb(254 202 202)'}`, // red-400/red-200
          },
        },
        loading: {
          iconTheme: {
            primary: 'rgb(20 184 166)', // teal-500
            secondary: isDark ? 'rgb(30 41 59)' : 'rgb(255 255 255)',
          },
        },
      }}
    />
  );
};

export default CustomToaster;