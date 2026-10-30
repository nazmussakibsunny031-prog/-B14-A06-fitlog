import { LuArrowDownToLine } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-panel to-[#0a0c10] p-6 sm:p-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
            Workout Library
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95"
          >
            <LuArrowDownToLine className="text-base" />
            Browse Workouts
          </a>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/banner.png"
            alt="Muscle anatomy figure on a gym machine"
            className="h-auto w-56 object-contain sm:w-72 lg:w-80"
            width={334}
            height={334}
          />
        </div>
      </div>
    </section>
  );
}
