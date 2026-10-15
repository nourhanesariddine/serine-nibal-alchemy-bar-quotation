"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type SelectionCtx = {
  selected: Set<string>;
  toggle: (id: string) => void;
};

const Ctx = createContext<SelectionCtx | null>(null);

export function SelectionProvider({
  initial,
  children,
}: {
  initial: string[];
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState(() => new Set(initial));

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ selected, toggle }), [selected, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
