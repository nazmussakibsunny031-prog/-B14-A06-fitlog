"use client";

import { MAX_PLAN } from "@/lib/constants";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fitlog-state-v1";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [state, setState] = useState({ plan: [], saved: [], done: [] });
  const [hydrated, setHydrated] = useState(false);

  // Load persisted data once on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          plan: Array.isArray(parsed.plan) ? parsed.plan : [],
          saved: Array.isArray(parsed.saved) ? parsed.saved : [],
          done: Array.isArray(parsed.done) ? parsed.done : [],
        });
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated]);

  const addToPlan = useCallback(
    (id) => {
      if (state.plan.includes(id)) return "duplicate";
      if (state.plan.length >= MAX_PLAN) return "full";
      setState((s) => ({ ...s, plan: [...s.plan, id] }));
      return "added";
    },
    [state.plan]
  );

  const addToSaved = useCallback(
    (id) => {
      if (state.saved.includes(id)) return "duplicate";
      setState((s) => ({ ...s, saved: [...s.saved, id] }));
      return "added";
    },
    [state.saved]
  );

  const removeFromPlan = useCallback((id) => {
    setState((s) => ({
      ...s,
      plan: s.plan.filter((x) => x !== id),
      done: s.done.filter((x) => x !== id),
    }));
  }, []);

  const removeFromSaved = useCallback((id) => {
    setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));
  }, []);

  const markDone = useCallback((id) => {
    setState((s) => (s.done.includes(id) ? s : { ...s, done: [...s.done, id] }));
  }, []);

  const value = useMemo(
    () => ({
      plan: state.plan,
      saved: state.saved,
      done: state.done,
      hydrated,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [state, hydrated, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
