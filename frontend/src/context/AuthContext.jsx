import React, { createContext, useState, useEffect } from "react";
import axios from "../api/Axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("shortly_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem("shortly_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("shortly_user");
    }
    setIsLoggedIn(!!user);
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    // Optionally store token if needed
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 