import { cn } from "@/lib/utils";

interface Props {
  /** mark height in px */
  size?: number;
  /** show the "Rivoj LC" wordmark next to the mark */
  withText?: boolean;
  /** "dark" wordmark for light backgrounds, "light" wordmark for dark backgrounds */
  tone?: "dark" | "light";
  className?: string;
}

/** Rivoj LC brand logo — green rounded-square "R" mark + wordmark. */
export function Logo({ size = 32, withText = true, tone = "dark", className }: Props) {
  const radius = Math.round(size * 0.28);
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div
        className="shrink-0 flex items-center justify-center font-extrabold text-white leading-none"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: "linear-gradient(135deg, #00D95A 0%, #00A844 100%)",
          fontSize: size * 0.6,
          fontFamily: "Manrope, Inter, sans-serif",
          boxShadow: "0 2px 6px rgba(0,200,83,.35)",
        }}
      >
        R
      </div>
      {withText && (
        <span
          className="font-extrabold tracking-tight"
          style={{ fontSize: size * 0.6, fontFamily: "Manrope, Inter, sans-serif", color: tone === "light" ? "#FFFFFF" : "#111827" }}
        >
          Rivoj<span style={{ color: "#00C853" }}> LC</span>
        </span>
      )}
    </div>
  );
}
