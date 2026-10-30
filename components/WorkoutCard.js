import Link from "next/link";
import { WORKOUT_IMAGE } from "@/lib/constants";
import { LuClock3, LuFlame, LuStar } from "react-icons/lu";

export function Stat({ icon: Icon, children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-zinc-300 ${className}`}>
      <Icon className="text-accent" />
      {children}
    </span>
  );
}

export function WorkoutStats({ workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <Stat icon={LuClock3}>{workout.duration} min</Stat>
      <Stat icon={LuFlame}>{workout.caloriesBurned} kcal</Stat>
      <Stat icon={LuStar}>{workout.rating}</Stat>
    </div>
  );
}

export function TagPills({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="aspect-[4/3] overflow-hidden bg-panel-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WORKOUT_IMAGE}
          alt={workout.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="mt-1 font-display text-lg font-bold uppercase leading-tight tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto pt-2">
          <WorkoutStats workout={workout} />
        </div>
      </div>
    </Link>
  );
}
