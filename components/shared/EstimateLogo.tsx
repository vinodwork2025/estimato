import Image from "next/image";

interface EstimateLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "dark" | "light" | "mark";
  className?: string;
}

// Full logo: 1873 × 357 → aspect 5.25
// Mark (house icon): 375 × 357 → aspect 1.05
const LOGO_CONFIG = {
  dark:  { src: "/logo.webp",      aspect: 5.25 },
  light: { src: "/logo.webp",      aspect: 5.25 },
  mark:  { src: "/logo-mark.webp", aspect: 1.05 },
};

const heights: Record<string, number> = { sm: 32, md: 40, lg: 52, xl: 72, "2xl": 88 };

export function EstimateLogo({
  size = "md",
  variant = "dark",
  className = "",
}: EstimateLogoProps) {
  const h = heights[size];
  const { src, aspect } = LOGO_CONFIG[variant];

  return (
    <Image
      src={src}
      alt="Estimato — Plan Smart. Build Better."
      width={Math.round(h * aspect)}
      height={h}
      className={`object-contain ${className}`}
      style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
      priority
    />
  );
}
