import Image from "next/image";

interface EstimateLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "dark" | "light" | "mark";
  className?: string;
}

const LOGO_CONFIG = {
  dark:  { src: "/brand-full-dark.png",  aspect: 3.8 },
  light: { src: "/brand-full-light.png", aspect: 3.8 },
  mark:  { src: "/brand-mark.png",       aspect: 1   },
};

const heights: Record<string, number> = { sm: 28, md: 36, lg: 48, xl: 86, "2xl": 96 };

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
      priority
    />
  );
}
