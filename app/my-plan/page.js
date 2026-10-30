"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";
import Spinner from "@/components/Spinner";
import { WorkoutStats } from "@/components/WorkoutCard";
import { usePlan } from "@/context/PlanContext";
import { MAX_PLAN, WORKOUT_IMAGE } from "@/lib/constants";
import useWorkouts from "@/hooks/useWorkouts";

const SORTS = {
  duration: { label: "Duration", fn: (a, b) => a.duration - b.duration },
  calories: { label: "Calories", fn: (a, b) => a.caloriesBurned - b.caloriesBurned },
  rating: { label: "Rating", fn: (a, b) => b.rating - a.rating },
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-4 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">Nothing here yet</h3>
      <p className="mt-1 text-sm text-muted">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanItem({ workout, tab, isDone, onDone, onRemove }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border bg-panel p-3 sm:flex-row sm:items-center sm:p-4 ${
        isDone ? "border-accent/40" : "border-line"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WORKOUT_IMAGE}
          alt={workout.name}
          referrerPolicy="no-referrer"
          className="h-16 w-24 shrink-0 rounded-lg object-cover sm:h-[60px] sm:w-24"
        />
        <div className="min-w-0">
          <h3
            className={`truncate font-display text-base font-bold uppercase tracking-wide ${
              isDone ? "text-zinc-400 line-through" : ""
            }`}
          >
            {workout.name}
          </h3>
          <p className="text-xs text-muted">{workout.equipment}</p>
          <div className="mt-1.5">
            <WorkoutStats workout={workout} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-zinc-600 px-4 py-2 text-xs font-semibold transition hover:border-zinc-300"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={onDone}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-black transition hover:brightness-95 disabled:cursor-default disabled:opacity-60"
          >
            <LuCheck />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="ml-auto rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white sm:ml-0"
        >
          <LuX className="text-base" />
        </button>
      </div>
    </li>
  );
}

export default function MyPlanPage() {
  const { plan, saved, done, hydrated, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const { workouts, loading, error } = useWorkouts();
  const [tab, setTab] = useState("plan");
  const [sortKey, setSortKey] = useState("duration");

  const planWorkouts = useMemo(
    () => workouts.filter((w) => plan.includes(w.id)),
    [workouts, plan]
  );
  const savedWorkouts = useMemo(
    () => workouts.filter((w) => saved.includes(w.id)),
    [workouts, saved]
  );

  const list = useMemo(() => {
    const source = tab === "plan" ? planWorkouts : savedWorkouts;
    return [...source].sort(SORTS[sortKey].fn);
  }, [tab, planWorkouts, savedWorkouts, sortKey]);

  const totals = useMemo(
    () => ({
      exercises: planWorkouts.length,
      minutes: planWorkouts.reduce((s, w) => s + w.duration, 0),
      calories: planWorkouts.reduce((s, w) => s + w.caloriesBurned, 0),
    }),
    [planWorkouts]
  );

  const handleDone = (w) => {
    markDone(w.id);
    toast.success(`${w.name} marked as done`);
  };

  const handleRemove = (w) => {
    if (tab === "plan") removeFromPlan(w.id);
    else removeFromSaved(w.id);
    toast.success(tab === "plan" ? "Removed from today's plan" : "Removed from saved");
  };

  const isLoading = loading || !hydrated;

  const tabBtn = (key, label) => (
    <button
      onClick={() => setTab(key)}
      className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
        tab === key ? "bg-white/10 text-white" : "text-muted hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide">My Plan</h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-panel p-5 sm:gap-6 sm:p-7">
        {[
          ["Exercises", totals.exercises, true],
          ["Minutes", totals.minutes, false],
          ["Calories", totals.calories, false],
        ].map(([label, value, accent]) => (
          <div key={label}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
            <p className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${accent ? "text-accent" : ""}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex gap-1 rounded-xl border border-line bg-panel p-1">
          {tabBtn("plan", "Today's Plan")}
          {tabBtn("saved", "Saved")}
        </div>

        <label className="flex items-center gap-2 text-xs text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="cursor-pointer appearance-none rounded-lg border border-line bg-panel py-2 pl-3 pr-8 text-xs font-semibold text-white outline-none focus:border-accent"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <LuChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted" />
          </span>
        </label>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Spinner label="Loading workouts…" />
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-line py-14 text-center">
            <p className="text-sm text-muted">Could not load workouts. Please refresh the page.</p>
          </div>
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ul className="space-y-3">
              {list.map((w) => (
                <PlanItem
                  key={w.id}
                  workout={w}
                  tab={tab}
                  isDone={done.includes(w.id)}
                  onDone={() => handleDone(w)}
                  onRemove={() => handleRemove(w)}
                />
              ))}
            </ul>
            {tab === "plan" && (
              <p className="mt-3 text-right text-xs text-muted">
                {plan.length}/{MAX_PLAN} lifts planned
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
