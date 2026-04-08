type Props = {
  remaining: number;  // e.g. 2340
  total: number;      // e.g. 4200
  spent: number;      // e.g. 1860
};

export default function SafeToSpend({ remaining, total, spent }: Props) {
  const pct = Math.min(100, ((total - remaining) / total) * 100);

  return (
    <div className="bg-bg-surface border border-border rounded-card p-[28px] flex flex-col gap-[12px]">
      <p className="text-[13px] text-text-secondary leading-[1.4]">
        Safe to spend this week
      </p>

      <p className="text-[34px] font-semibold text-accent-freedom leading-[1.4]">
        ₹{remaining.toLocaleString("en-IN")}
      </p>

      {/* Progress bar track */}
      <div className="relative h-[6px] bg-bg-muted rounded-full w-full overflow-hidden">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-accent-freedom rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-[12px] text-text-muted leading-[1.4]">
        ₹{total.toLocaleString("en-IN")} total&nbsp;&nbsp;·&nbsp;&nbsp;₹{spent.toLocaleString("en-IN")} spent so far
      </p>
    </div>
  );
}
