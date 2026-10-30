"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutActive = pathname === "/" || pathname.startsWith("/workouts");
  const planActive = pathname.startsWith("/my-plan");

  const linkBase =
    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm";
  const activeCls = "bg-accent/15 text-accent";
  const idleCls = "text-zinc-300 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <Logo size={28} />
          <span className="hidden font-display text-lg font-bold tracking-wide sm:inline">FITLOG</span>
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-line bg-panel p-1">
          <Link href="/" className={`${linkBase} ${workoutActive ? activeCls : idleCls}`}>
            Workout
          </Link>
          <Link href="/my-plan" className={`${linkBase} ${planActive ? activeCls : idleCls}`}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold sm:gap-2">
          <Link
            href="/my-plan"
            aria-label={`Plan: ${plan.length} workouts`}
            className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-black transition hover:brightness-95"
          >
            <span>Plan</span>
            <span className="min-w-4 text-center">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved: ${saved.length} workouts`}
            className="flex items-center gap-1.5 rounded-full border border-zinc-600 px-2.5 py-1 text-white transition hover:border-zinc-400"
          >
            <span>Saved</span>
            <span className="min-w-4 text-center">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
