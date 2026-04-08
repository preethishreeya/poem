type Props = {
  debtFreeDate: string;       // e.g. "14 March 2027"
  remaining: number;          // e.g. 340000
  activeDebts: number;        // e.g. 2
  daysPerThousand: number;    // e.g. 3
};

export default function DebtTracker({
  debtFreeDate,
  remaining,
  activeDebts,
  daysPerThousand,
}: Props) {
  return (
    <div className="bg-bg-surface border border-border rounded-card p-[28px] flex flex-col gap-[12px] leading-[1.4]">
      <p className="text-[13px] text-text-secondary">
        Debt-free date
      </p>

      <p className="text-[26px] font-semibold text-text-primary">
        {debtFreeDate}
      </p>

      <p className="text-[12px] text-text-muted">
        ₹{remaining.toLocaleString("en-IN")} remaining&nbsp;&nbsp;·&nbsp;&nbsp;{activeDebts} active debt{activeDebts !== 1 ? "s" : ""}
      </p>

      <p className="text-[13px] text-text-secondary">
        Every ₹1,000 saved moves this date forward {daysPerThousand} days.
      </p>
    </div>
  );
}
