"use client";

import { useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/api";

export default function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { workouts, loading, error };
}
