import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-7 w-7" };

export function StarRating({ value, onChange, readOnly, size = "md", className }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(display);
        const half = !filled && i - 0.5 <= display;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(i)}
            className={cn(
              "transition-colors",
              !readOnly && "cursor-pointer hover:scale-110",
              readOnly && "cursor-default",
            )}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                SIZE[size],
                filled || half
                  ? "fill-[var(--gold)] text-[var(--gold)]"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
