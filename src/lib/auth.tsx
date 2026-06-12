import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const MOCK_EMAIL = "admin@hellow.ma";
const MOCK_PASSWORD = "123456";
const STORAGE_KEY = "hellow_ai_auth";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setEmail(stored);
    setReady(true);
  }, []);

  const login = (e: string, p: string) => {
    if (e.trim().toLowerCase() === MOCK_EMAIL && p === MOCK_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, MOCK_EMAIL);
      setEmail(MOCK_EMAIL);
      return { ok: true };
    }
    return { ok: false, error: "Identifiants incorrects. Essayez admin@hellow.ma / 123456." };
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!email, email, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
