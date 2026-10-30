"use client";

import useWorkouts from "@/hooks/useWorkouts";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

export default function Library() {
  const { workouts, loading, error } = useWorkouts();

  return (
    <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <h2 className="font-display text-3xl font-bold uppercase tracking-wide">The Library</h2>
      <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>

      {loading && <Spinner />}

      {!loading && error && (
        <div className="mt-8 rounded-2xl border border-dashed border-line py-14 text-center">
          <p className="font-display text-xl font-bold uppercase">Could not load workouts</p>
          <p className="mt-1 text-sm text-muted">Check your connection and refresh the page.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
