import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  content: Record<string, string>;
  saveContent: (key: string, value: string) => Promise<boolean>;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          setContent(data);
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Failed to fetch content from API:', error);
    }
    
    // Fallback to localStorage for static deployments (like Netlify)
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local content', e);
      }
    }
    setIsLoading(false);
  };

  const login = async (password: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { token } = await res.json();
          localStorage.setItem('adminToken', token);
          setIsAdmin(true);
          return true;
        }
      }
    } catch (error) {
      console.error('API Login failed:', error);
    }

    // Fallback for static deployments without a backend
    if (password === "asha0527") {
      localStorage.setItem('adminToken', 'static-token-fallback');
      setIsAdmin(true);
      return true;
    }

    return false;
  };

  const logout = async () => {
    const token = localStorage.getItem('adminToken');
    if (token && token !== 'static-token-fallback') {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const saveContent = async (key: string, value: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, value })
      });
      
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          setContent(prev => ({ ...prev, [key]: value }));
          return true;
        }
      }
      
      if (res.status === 401) {
        logout();
        return false;
      }
    } catch (error) {
      console.error('API Save failed:', error);
    }

    // Fallback for static deployments
    if (token === 'static-token-fallback') {
      setContent(prev => {
        const newContent = { ...prev, [key]: value };
        localStorage.setItem('siteContent', JSON.stringify(newContent));
        return newContent;
      });
      return true;
    }

    return false;
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, content, saveContent, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
