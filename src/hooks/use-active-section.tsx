'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Ctx = { id: string; setId: (id: string) => void };
const ActiveCtx = createContext<Ctx | null>(null);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState('');

  return (
    <ActiveCtx.Provider value={{ id, setId }}>{children}</ActiveCtx.Provider>
  );
}
export function useActiveSection() {
  const ctx = useContext(ActiveCtx);

  if (!ctx) throw new Error('useActiveSection outside provider');

  return ctx;
}
