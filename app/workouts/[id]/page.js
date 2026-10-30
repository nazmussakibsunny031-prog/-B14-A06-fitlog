"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { LuBookmark, LuPlus } from "react-icons/lu";
import Spinner from "@/components/Spinner";
import { TagPills } from "@/components/WorkoutCard";
import { usePlan } from "@/context/PlanContext";
import { MAX_PLAN, WORKOUT_IMAGE } from "@/lib/constants";
import { fetchWorkout } from "@/lib/api";

export default function WorkoutDetailsPage({ params }) {
  const { id } = use(params);
  const numericId = Number(id);

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  const { plan, saved, addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    fetchWorkout(id)
      .then((data) => (data ? setWorkout(data) : setMissing(true)))
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (missing) notFound();
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Spinner label="Loading workout…" />
      </div>
    );
  }

  const inPlan = plan.includes(numericId);
  const inSaved = saved.includes(numericId);
  const planFull = plan.length >= MAX_PLAN && !inPlan;

  const handleAddToPlan = () => {
    const result = addToPlan(numericId);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "duplicate") toast("Already in today's plan", { icon: "ℹ️" });
    else toast.error(`Today's plan is full (max ${MAX_PLAN} lifts)`);
  };

  const handleSave = () => {
    const result = addToSaved(numericId);
    if (result === "added") toast.success("Saved for later");
    else toast("Already saved", { icon: "ℹ️" });
  };

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-2 lg:gap-12">
      <div className="overflow-hidden rounded-3xl border border-line bg-panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WORKOUT_IMAGE}
          alt={workout.name}
          referrerPolicy="no-referrer"
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{workout.description}</p>
        <div className="mt-4">
          <TagPills tags={workout.muscleGroups} />
        </div>

        <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">Instructions</h2>
        <ol className="mt-3 space-y-2.5 text-sm text-zinc-300">
          {workout.instructions?.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-semibold text-accent">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleAddToPlan}
            disabled={planFull}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuPlus className="text-base" />
            {planFull ? "Plan is full (5/5)" : "Add to today's plan"}
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold transition hover:border-zinc-300"
          >
            <LuBookmark className={`text-base ${inSaved ? "fill-current text-accent" : ""}`} />
            Save for later
          </button>
        </div>
      </div>
    </section>
  );
}
