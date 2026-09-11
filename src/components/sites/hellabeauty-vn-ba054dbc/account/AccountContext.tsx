"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface AccountUser {
  name: string;
  email: string;
  phone: string;
  avatarColor: string;
}

interface AccountContextValue {
  user: AccountUser | null;
  hydrated: boolean;
  signup: (user: AccountUser) => void;
  login: (email: string) => void;
  logout: () => void;
}

const AccountContext = createContext<AccountContextValue | null>(null);
const STORAGE_KEY = "hella-account";

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage (per-viewer demo only; passwords never stored).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage (unavailable during SSR)
      if (raw) setUser(JSON.parse(raw) as AccountUser);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: AccountUser | null) => {
    setUser(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const signup = useCallback((u: AccountUser) => persist(u), [persist]);
  const login = useCallback(
    (email: string) => {
      // Demo: re-use stored user if the email matches, else create a light session.
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const existing = JSON.parse(raw) as AccountUser;
          if (existing.email === email) {
            setUser(existing);
            return;
          }
        }
      } catch {
        /* ignore */
      }
      const name = email.split("@")[0] || "Hella Bestie";
      persist({ name, email, phone: "", avatarColor: "#698269" });
    },
    [persist],
  );
  const logout = useCallback(() => persist(null), [persist]);

  return (
    <AccountContext.Provider value={{ user, hydrated, signup, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
