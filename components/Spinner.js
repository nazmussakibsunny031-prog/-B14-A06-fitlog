export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="fl-spinner" />
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="fl-pulse-dot h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
