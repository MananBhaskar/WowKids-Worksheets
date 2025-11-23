// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Fetch admin profile using the cookie on startup
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/me"); 
        if (res?.data?.data) {
          setAdmin(res.data.data);
        }
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoadingAuth(false);
      }
    })();
  }, []);


  const login = async ({ email, password }) => {
    const res = await api.post("/admin/login", { email, password });
    const adminData = res?.data?.data?.admin || res?.data?.data;
    setAdmin(adminData);
    return adminData;
  };


  const logout = async () => {
    await api.post("/admin/logout");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        login,
        logout,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
