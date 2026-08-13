import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SplashScreen } from './pages/SplashScreen';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Inspirasi } from './pages/Inspirasi';
import { Workspace } from './pages/Workspace';
import { AsistenMenulis } from './pages/AsistenMenulis';
import { Profil } from './pages/Profil';
import { AppLayout } from './components/layout/AppLayout';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="w-8 h-8 rounded-xl bg-black animate-pulse" />
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Guard (Redirect to /dashboard if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="w-8 h-8 rounded-xl bg-black animate-pulse" />
      </div>
    );
  }

  if (user.isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Splash Screen */}
          <Route path="/" element={<SplashScreen />} />

          {/* Login Screen */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Main Workspace Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inspirasi" element={<Inspirasi />} />
            <Route path="/menulis" element={<Workspace />} />
            <Route path="/ai" element={<AsistenMenulis />} />
            <Route path="/profil" element={<Profil />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
