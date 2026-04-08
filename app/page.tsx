import Sidebar from "@/components/Sidebar";
import InputCard from "@/components/InputCard";
import SafeToSpend from "@/components/SafeToSpend";
import DebtTracker from "@/components/DebtTracker";

// Static demo values — will be replaced with real user data (Supabase) in later sprints
const DEMO = {
  debtFreeDateShort: "14 Mar 2027",
  debtFreeDateLong: "14 March 2027",
  consequence: {
    newDate: "28 March 2027",
    daysAdded: 14,
    extraInterest: 320,
  },
  safeToSpend: {
    remaining: 2340,
    total: 4200,
    spent: 1860,
  },
  debtTracker: {
    remaining: 340000,
    activeDebts: 2,
    daysPerThousand: 3,
  },
};

export default function RealityCheckPage() {
  return (
    <div className="min-h-screen bg-bg-app flex">
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main className="ml-[220px] flex-1 min-h-screen bg-bg-app overflow-y-auto">
        <div className="px-[80px] py-0">
          {/* Header */}
          <div className="flex items-center justify-between h-[112px]">
            <h1 className="text-[26px] font-semibold text-text-primary">
              Reality Check
            </h1>

            {/* Debt-free date badge */}
            <div className="bg-bg-surface border border-border rounded-badge px-[16px] h-[34px] flex items-center">
              <span className="text-[13px] font-medium text-accent-freedom whitespace-nowrap">
                Debt-free date: {DEMO.debtFreeDateShort}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Cards grid */}
          <div className="pt-[24px] grid grid-cols-[580px_1fr] gap-[24px] items-start">
            {/* Left — Input Card */}
            <InputCard consequence={DEMO.consequence} />

            {/* Right — stacked info cards */}
            <div className="flex flex-col gap-[16px]">
              <SafeToSpend
                remaining={DEMO.safeToSpend.remaining}
                total={DEMO.safeToSpend.total}
                spent={DEMO.safeToSpend.spent}
              />
              <DebtTracker
                debtFreeDate={DEMO.debtFreeDateLong}
                remaining={DEMO.debtTracker.remaining}
                activeDebts={DEMO.debtTracker.activeDebts}
                daysPerThousand={DEMO.debtTracker.daysPerThousand}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
