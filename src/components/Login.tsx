import { LayoutGrid, Settings2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { Workspace } from "@/components/crm/nav";

interface Props {
  onEnter: (ws: Workspace) => void;
}

const CARDS: { id: Workspace; label: string; sub: string; icon: typeof LayoutGrid }[] = [
  { id: "crm", label: "CRM", sub: "Lidlar, kanban, pipeline va analitika", icon: LayoutGrid },
  { id: "boshqaruv", label: "Boshqaruv", sub: "Moliya, o'quvchilar va avtovoronka", icon: Settings2 },
];

export function Login({ onEnter }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8FAFC" }}>
      <div className="w-full" style={{ maxWidth: 480 }}>
        <div className="flex justify-center" style={{ marginBottom: 40 }}>
          <Logo size={48} />
        </div>

        <div className="space-y-3">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => onEnter(c.id)}
                className="group w-full flex items-center gap-4 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,.08)] border border-[#EAECEF]"
                style={{ borderRadius: 24, boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
              >
                <div className="h-12 w-12 rounded-2xl bg-[#EAFBF1] flex items-center justify-center text-[#00C853] shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] font-bold text-[#111827]">{c.label}</div>
                  <div className="text-sm text-[#6B7280]">{c.sub}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-[#9CA3AF] group-hover:text-[#00C853] group-hover:translate-x-0.5 transition" />
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-8">Rivoj Learning Center · Demo</p>
      </div>
    </div>
  );
}
