import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import {
  saveToken,
  saveUsername,
  clearStorage,
  getToken,
  getUsername,
} from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUsername());
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUsername();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (username, password) => {
    const data = await loginUser({
      username,
      password,
    });

    saveToken(data.token);
    saveUsername(data.username);

    setToken(data.token);
    setUser(data.username);

    return data;
  };

  // Logout
  const logout = () => {
    clearStorage();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);