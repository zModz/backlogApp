import { getAuthTwitch } from "@/api/twitchAuth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const data = await getAuthTwitch();
        setAuth(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
