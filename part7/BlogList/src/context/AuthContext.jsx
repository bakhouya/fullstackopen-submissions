import React, { createContext, useContext, useState, useEffect } from "react";
import blogService from "../services/blogService";
import userService from "../services/userService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER_AUTH")));
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_AUTH");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(parsedUser.token);
        blogService.setToken(parsedUser.token);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("USER_AUTH");
      }
    }else {setLoading(false)}
  }, []);
  
  const validateToken = async (token) => {
    try {
      const response = await userService.verifyToken(token);
      if (!response || !response.id) {
        throw new Error("Invalid token");
      }
      setLoading(false);
    } catch (error) {
      console.warn("Token expired or invalid:", error);
      logout();
    }
  };

  const handletoken = () => {
        const storedUser = localStorage.getItem("USER_AUTH");
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(parsedUser.token);
        blogService.setToken(parsedUser.token);
  }

  const login = (userData) => {   
    if (!userData) {
        console.error("Invalid login data:", userData);
        return ;
    }else {
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem("TOKEN", userData.token);
        localStorage.setItem("USER_AUTH", JSON.stringify(userData));
        handletoken()
    } 
  };

  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_AUTH");
  };

  const value = { user, token, login, logout, isLoggedIn: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
