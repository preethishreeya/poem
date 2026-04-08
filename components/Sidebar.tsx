type NavItem = {
  label: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Reality Check", active: true },
  { label: "Debt Tracker" },
  { label: "No-Spend Weeks" },
  { label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-bg-app border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-9 pb-6">
        <span className="text-[17px] font-semibold text-text-primary tracking-tight">
          pause.
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-[10px]">
        <ul className="space-y-[2px]">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-[10px] px-[10px] h-[34px] rounded-[8px] text-[14px] font-medium text-left transition-colors ${
                  item.active
                    ? "bg-[#E4F9F4] text-text-primary"
                    : "text-text-secondary hover:bg-bg-muted"
                }`}
              >
                {/* Nav dot */}
                <span
                  className={`inline-block w-[6px] h-[6px] rounded-full flex-shrink-0 ${
                    item.active ? "bg-accent-freedom" : "bg-[#D1D5DB]"
                  }`}
                />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Streak badge */}
      <div className="px-[10px] pb-[16px]">
        <div className="bg-bg-muted rounded-[10px] px-[16px] py-[14px]">
          <p className="text-[13px] font-semibold text-accent-freedom leading-[1.4]">
            🔥&nbsp; 4 no-spend days
          </p>
          <p className="text-[12px] text-text-muted leading-[1.4] mt-[2px]">
            Current streak
          </p>
        </div>
      </div>
    </aside>
  );
}
