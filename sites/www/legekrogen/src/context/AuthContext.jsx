import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { decodeJwt } from "../utils/jwt"; // <— înlocuiește jwt-decode
import { api } from "../api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return setUser(null);
    const payload = decodeJwt(token);
    if (payload && payload.id) {
      setUser({
        id: payload.id,
        role: payload.role,
        name: payload.name,
        picture: payload.picture,
      });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api("/users/login", {
      method: "POST",
      data: { email, password },
    });
    localStorage.setItem("token", res.token);
    setToken(res.token);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
