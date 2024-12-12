import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      const {role} = storedUser;
      setUser({role});
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const isAuthenticated = !!user;

  const isAdmin = user?.role === 'admin';
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
