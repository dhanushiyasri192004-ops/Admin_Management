import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';

function AppContent() {
  const { theme, isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#0b1322] text-slate-100' : 'light bg-[#f8fafc] text-slate-900'} transition-colors duration-200`}>
      <AppRoutes />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
