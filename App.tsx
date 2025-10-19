import React, { useState, useEffect, useCallback } from 'react';
import { LoginPage } from './pages/LoginPage';
import { ScannerPage } from './pages/ScannerPage';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/check_session.php');
      if (!response.ok) {
          console.error("Session check failed with status:", response.status);
          return;
      }

      const text = await response.text();
      // Only parse the text if the response body is not empty.
      if (text) {
        const data = JSON.parse(text);
        if (data.isAuthenticated) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Could not check session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogin = useCallback(async (username: string, password: string) => {
    const response = await fetch('/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Login failed.');
    }

    setUser(data.user);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/logout.php');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return user ? (
    <ScannerPage user={user} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
};

export default App;