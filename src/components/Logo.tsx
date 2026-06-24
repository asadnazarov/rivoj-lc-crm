import { cn } from "@/lib/utils";

interface Props {
  /** mark height in px */
  size?: number;
  /** show the "Rivoj LC" wordmark next to the mark */
  withText?: boolean;
  className?: string;
}

/** Rivoj LC brand logo — green rounded-square "R" mark + wordmark. */
export function Logo({ size = 32, withText = true, className }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="48" height="48" rx="13" fill="#00C853" />
        <path
          d="M16 13h11.2c4.3 0 7.3 2.7 7.3 6.8 0 3.1-1.8 5.4-4.6 6.3L35 35h-5.6l-4.4-7.8H21V35h-5V13Zm5 4.4v6h6c1.9 0 3.2-1.2 3.2-3s-1.3-3-3.2-3h-6Z"
          fill="#fff"
        />
      </svg>
      {withText && (
        <span className="text-[19px] font-extrabold tracking-tight text-foreground" style={{ fontFamily: "Manrope, Inter, sans-serif" }}>
          Rivoj<span className="text-[#00C853]"> LC</span>
        </span>
      )}
    </div>
  );
}
