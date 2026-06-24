import { useEffect, useState } from "react";
import { Login } from "@/components/Login";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { Kanban } from "@/components/crm/Kanban";
import { Pipeline } from "@/components/crm/Pipeline";
import { Rejections } from "@/components/crm/Rejections";
import { Placeholder } from "@/components/crm/Placeholder";
import { Moliya } from "@/components/sections/Moliya";
import { NAV, SECTION_TITLE, type SectionId } from "@/components/crm/nav";
import { cn } from "@/lib/utils";

type Role = "boshliq" | "admin" | "ustoz";

const Index = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<SectionId>("kanban");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") as Role | null);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8FAFC" }}>
        <div className="text-[#9CA3AF]">Yuklanmoqda...</div>
      </div>
    );
  }
  if (!role) return <Login />;

  return (
    <div className="h-screen flex bg-[#F8FAFC] overflow-hidden">
      <Sidebar active={active} onChange={(s) => { setActive(s); setSearch(""); }} role={role} onLogout={handleLogout} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={SECTION_TITLE[active]} search={search} onSearch={setSearch} onLogout={handleLogout} />

        <div className="flex-1 min-h-0 flex flex-col">
          {active === "kanban"   && <Kanban search={search} />}
          {active === "pipeline" && <Pipeline search={search} />}
          {active === "rad"      && <Rejections search={search} />}
          {active === "moliya"   && (
            <div className="flex-1 overflow-y-auto scrollbar-thin px-5 md:px-7 py-6">
              <Moliya />
            </div>
          )}
          {!["kanban", "pipeline", "rad", "moliya"].includes(active) && <Placeholder title={SECTION_TITLE[active]} />}
        </div>

        {/* mobile bottom nav */}
        <nav className="lg:hidden shrink-0 flex overflow-x-auto bg-white border-t border-[#EAECEF]">
          {NAV.filter((n) => n.ready).map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <button key={it.id} onClick={() => { setActive(it.id); setSearch(""); }}
                className={cn("flex-1 min-w-[72px] flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition",
                  isActive ? "text-[#00C853]" : "text-[#9CA3AF]")}>
                <Icon className="h-5 w-5" />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Index;
