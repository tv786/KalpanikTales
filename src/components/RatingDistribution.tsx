import { Star } from "lucide-react";

export function RatingDistribution({ scores }: { scores: number[] }) {
  const total = scores.length;
  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: scores.filter((s) => Math.round(s) === star).length,
  }));
  const avg = total ? scores.reduce((a, c) => a + c, 0) / total : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="font-display text-5xl text-[var(--gold)]">{avg.toFixed(1)}</div>
          <div className="mt-1 flex items-center justify-center gap-0.5 text-[var(--gold)]">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i <= Math.round(avg) ? "currentColor" : "transparent"}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {total} {total === 1 ? "rating" : "ratings"}
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {buckets.map((b) => {
            const pct = total ? (b.count / total) * 100 : 0;
            return (
              <div key={b.star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-muted-foreground">{b.star}</span>
                <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-[var(--gold)]" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{b.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
