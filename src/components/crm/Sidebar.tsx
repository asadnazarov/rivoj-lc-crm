import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { NAV, WORKSPACES, type SectionId, type Workspace } from "./nav";

interface Props {
  workspace: Workspace;
  active: SectionId;
  onChangeWorkspace: (ws: Workspace) => void;
  onChange: (id: SectionId) => void;
  onLogout: () => void;
}

export function Sidebar({ workspace, active, onChangeWorkspace, onChange, onLogout }: Props) {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-white border-r border-[#EAECEF]">
      <div className="h-[72px] flex items-center px-5 border-b border-[#EAECEF]">
        <Logo size={30} />
      </div>

      {/* workspace switcher */}
      <div className="p-3">
        <div className="flex gap-1 p-1 rounded-xl bg-[#F5F6F8]">
          {WORKSPACES.map((w) => (
            <button
              key={w.id}
              onClick={() => onChangeWorkspace(w.id)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-colors",
                workspace === w.id ? "bg-white text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,.08)]" : "text-[#9CA3AF] hover:text-[#6B7280]",
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <p className="px-6 pt-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
        {WORKSPACES.find((w) => w.id === workspace)?.sub}
      </p>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV[workspace].map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group",
                isActive ? "bg-[#EAFBF1]" : "hover:bg-[#F5F6F8]",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px] mt-0.5 shrink-0", isActive ? "text-[#00C853]" : "text-[#9CA3AF] group-hover:text-[#6B7280]")} />
              <div className="min-w-0">
                <div className={cn("text-sm font-medium leading-tight", isActive ? "text-[#111827]" : "text-[#6B7280] group-hover:text-[#111827]")}>{item.label}</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5 leading-tight">{item.sub}</div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#EAECEF]">
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#EF4444] transition">
          <LogOut className="h-4 w-4" /> Chiqish
        </button>
      </div>
    </aside>
  );
}
