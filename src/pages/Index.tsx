import { useEffect, useState } from "react";
import { Login } from "@/components/Login";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { Kanban } from "@/components/crm/Kanban";
import { Pipeline } from "@/components/crm/Pipeline";
import { Rejections } from "@/components/crm/Rejections";
import { Analitika } from "@/components/crm/Analitika";
import { Oquvchilar } from "@/components/boshqaruv/Oquvchilar";
import { Avtovoronka } from "@/components/boshqaruv/Avtovoronka";
import { Moliya } from "@/components/sections/Moliya";
import { NAV, SECTION_TITLE, DEFAULT_SECTION, type SectionId, type Workspace } from "@/components/crm/nav";
import { cn } from "@/lib/utils";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<Workspace>("crm");
  const [active, setActive] = useState<SectionId>("kanban");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const ws = localStorage.getItem("ws") as Workspace | null;
    if (ws) {
      setWorkspace(ws);
      setActive(DEFAULT_SECTION[ws]);
      setEntered(true);
    }
    setLoading(false);
  }, []);

  const enter = (ws: Workspace) => {
    localStorage.setItem("ws", ws);
    setWorkspace(ws);
    setActive(DEFAULT_SECTION[ws]);
    setEntered(true);
  };

  const switchWorkspace = (ws: Workspace) => {
    localStorage.setItem("ws", ws);
    setWorkspace(ws);
    setActive(DEFAULT_SECTION[ws]);
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("ws");
    setEntered(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8FAFC" }}>
        <div className="text-[#9CA3AF]">Yuklanmoqda...</div>
      </div>
    );
  }
  if (!entered) return <Login onEnter={enter} />;

  return (
    <div className="h-screen flex bg-[#F8FAFC] overflow-hidden">
      <Sidebar
        workspace={workspace}
        active={active}
        onChangeWorkspace={switchWorkspace}
        onChange={(s) => { setActive(s); setSearch(""); }}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={SECTION_TITLE[active]} search={search} onSearch={setSearch} onLogout={handleLogout} />

        <div className="flex-1 min-h-0 flex flex-col">
          {active === "kanban"      && <Kanban search={search} />}
          {active === "pipeline"    && <Pipeline search={search} />}
          {active === "rad"         && <Rejections search={search} />}
          {active === "analitika"   && <Analitika />}
          {active === "oquvchilar"  && <Oquvchilar />}
          {active === "avtovoronka" && <Avtovoronka />}
          {active === "moliya"      && (
            <div className="flex-1 overflow-y-auto scrollbar-thin px-5 md:px-7 py-6">
              <Moliya />
            </div>
          )}
        </div>

        {/* mobile bottom nav */}
        <nav className="lg:hidden shrink-0 flex overflow-x-auto bg-white border-t border-[#EAECEF]">
          {NAV[workspace].map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <button key={it.id} onClick={() => { setActive(it.id); setSearch(""); }}
                className={cn("flex-1 min-w-[80px] flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition",
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
