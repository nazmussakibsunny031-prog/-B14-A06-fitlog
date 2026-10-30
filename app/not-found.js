import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export const metadata = { title: "404 — Page not found | FitLog" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        Rep not found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The page you are looking for does not exist or has been moved. Let&apos;s get you back to the gym floor.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:brightness-95"
      >
        <LuArrowLeft /> Back to workouts
      </Link>
    </section>
  );
}
