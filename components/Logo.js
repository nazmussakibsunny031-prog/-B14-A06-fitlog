export default function Logo({ size = 28, className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/logo.png"
      alt="FitLog logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, imageRendering: "auto" }}
    />
  );
}
