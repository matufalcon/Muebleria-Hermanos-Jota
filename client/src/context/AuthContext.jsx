import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  // 'user' se deriva del token
  // 'isAuthenticated' se deriva de si el token existe o no
  const user = token ? (() => {
    try { return jwtDecode(token) }
    catch { return null; }
  })() : null;

  const isAuthenticated = !!user;

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    }else{
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const login = (jwtToken) => {
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
