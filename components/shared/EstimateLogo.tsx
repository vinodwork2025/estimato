import Image from "next/image";

interface EstimateLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  className?: string;
}

const heights = { sm: 28, md: 36, lg: 52 };

export function EstimateLogo({
  size = "md",
  variant = "dark",
  className = "",
}: EstimateLogoProps) {
  const h = heights[size];

  if (variant === "light") {
    return (
      <span
        className={`inline-flex items-center gap-2 font-serif text-white ${className}`}
        style={{ fontSize: h * 0.6, letterSpacing: "0.05em" }}
        aria-label="Estimato"
      >
        <svg width={h * 0.55} height={h * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M3 20L12 4l9 16H3z" stroke="#C5A059" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7 20v-6h10v6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span style={{ letterSpacing: "0.08em" }}>ESTIMATO</span>
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Estimato — Plan Smart. Build Better."
      width={h * 3.8}
      height={h}
      className={`object-contain ${className}`}
      priority
    />
  );
}
