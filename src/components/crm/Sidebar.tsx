import { Lock, LogIn, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { NAV, type SectionId } from "./nav";

type Role = "boshliq" | "admin" | "ustoz";

const ROLE_ITEMS: { id: Role; label: string }[] = [
  { id: "boshliq", label: "Boshliq" },
  { id: "admin", label: "Admin" },
  { id: "ustoz", label: "Ustoz" },
];

interface Props {
  active: SectionId;
  onChange: (id: SectionId) => void;
  role: Role;
  onLogout: () => void;
}

export function Sidebar({ active, onChange, role, onLogout }: Props) {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-white border-r border-[#EAECEF]">
      <div className="h-[72px] flex items-center px-5 border-b border-[#EAECEF]">
        <Logo size={30} />
      </div>

      {/* role list */}
      <div className="px-3 pt-4 space-y-0.5">
        {ROLE_ITEMS.map((r) => (
          <div
            key={r.id}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium",
              r.id === role ? "text-[#111827]" : "text-[#6B7280]",
            )}
          >
            {r.id === "boshliq" ? <Lock className="h-4 w-4 text-[#00C853]" /> : <LogIn className="h-4 w-4 text-[#00C853]" />}
            {r.label}
          </div>
        ))}
      </div>

      <p className="px-6 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Asosiy</p>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors",
                isActive
                  ? "bg-[#EAFBF1] text-[#111827]"
                  : "text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#111827]",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-[#00C853]" : "text-[#9CA3AF]")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#EAECEF]">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="h-9 w-9 rounded-full bg-[#EAFBF1] text-[#00963D] flex items-center justify-center text-sm font-bold">
            {role === "admin" ? "AD" : role === "boshliq" ? "BO" : "US"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate text-[#111827]">
              {role === "admin" ? "Abdulloh" : role === "boshliq" ? "Rahbar" : "Ustoz"}
            </div>
            <div className="text-xs text-[#9CA3AF] capitalize truncate">{role}</div>
          </div>
          <button onClick={onLogout} title="Chiqish"
            className="h-8 w-8 rounded-lg hover:bg-[#F5F6F8] flex items-center justify-center text-[#9CA3AF] hover:text-[#EF4444] transition">
            <LogOut className="h-4 w-4" />
          </button>
          <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
        </div>
      </div>
    </aside>
  );
}
