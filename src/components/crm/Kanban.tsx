import { useMemo, useState } from "react";
import { Plus, UserPlus, Phone, CalendarDays, FileText, GraduationCap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { crmStore, useLeads } from "@/lib/crmStore";
import { STAGES, SOURCES, TEACHERS, type Lead, type Stage } from "@/data/leads";
import { LeadCard } from "./LeadCard";
import { LeadDetail } from "./LeadDetail";
import { LeadDialog } from "./LeadDialog";

const STAT_ICON: Record<Stage, typeof UserPlus> = {
  yangi: UserPlus,
  aloqaga: Phone,
  probniy: CalendarDays,
  shartnoma: FileText,
  faol: GraduationCap,
};

interface Props {
  search: string;
}

export function Kanban({ search }: Props) {
  const leads = useLeads();
  const [source, setSource] = useState("all");
  const [teacher, setTeacher] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{ lead: Lead | null; stage: Stage } | null>(null);

  const active = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) =>
      !l.rejected &&
      (source === "all" || l.source === source) &&
      (teacher === "all" || l.teacher === teacher) &&
      (!q || l.name.toLowerCase().includes(q) || l.phone.includes(q)),
    );
  }, [leads, source, teacher, search]);

  const byStage = (s: Stage) => active.filter((l) => l.stage === s);
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  const onDrop = (stage: Stage) => {
    if (dragId) crmStore.moveStage(dragId, stage);
    setDragId(null);
  };

  return (
    <div className="flex-1 min-h-0 flex">
      <div className="flex-1 min-w-0 flex flex-col">
        {/* filters */}
        <div className="flex flex-wrap items-center gap-3 px-5 md:px-7 py-4">
          <FilterSelect value={source} onChange={setSource}
            options={[["all", "Barcha manbalar"], ...SOURCES.map((s) => [s, s] as [string, string])]} />
          <FilterSelect value={teacher} onChange={setTeacher}
            options={[["all", "Barcha ustozlar"], ...TEACHERS.map((t) => [t, t] as [string, string])]} />
          <FilterSelect value="iyun" onChange={() => {}} options={[["iyun", "Iyun 2025"]]} />
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 px-5 md:px-7 pb-4">
          {STAGES.map((s) => {
            const Icon = STAT_ICON[s.id];
            return (
              <div key={s.id} className="bg-white border border-[#EAECEF] p-4 flex items-center gap-3" style={{ borderRadius: 16 }}>
                <div className="h-10 w-10 rounded-xl bg-[#EAFBF1] flex items-center justify-center text-[#00C853]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] leading-tight">{s.label}</div>
                  <div className="num text-xl font-bold text-[#111827]">{byStage(s.id).length}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* columns */}
        <div className="flex-1 min-h-0 overflow-x-auto scrollbar-thin px-5 md:px-7 pb-6">
          <div className="flex gap-4 h-full">
            {STAGES.map((s) => {
              const items = byStage(s.id);
              return (
                <div
                  key={s.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(s.id)}
                  className="w-[300px] shrink-0 flex flex-col bg-[#F8FAFC] border border-[#EAECEF] overflow-hidden"
                  style={{ borderRadius: 16 }}
                >
                  <span className="h-1 bg-[#00C853]" />
                  <div className="h-[52px] flex items-center justify-between px-3.5 border-b border-[#EAECEF] bg-white">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#111827]">{s.label}</span>
                      <span className="num text-xs text-[#9CA3AF]">{items.length}</span>
                    </div>
                    <button onClick={() => setDialog({ lead: null, stage: s.id })}
                      className="h-7 w-7 rounded-lg hover:bg-[#EAFBF1] flex items-center justify-center text-[#9CA3AF] hover:text-[#00C853] transition">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto scrollbar-thin p-2.5 space-y-2.5">
                    {items.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        dragging={dragId === lead.id}
                        onDragStart={() => setDragId(lead.id)}
                        onClick={() => setSelectedId(lead.id)}
                      />
                    ))}
                    {items.length === 0 && (
                      <div className="text-center text-xs text-[#9CA3AF] py-8">Bo'sh</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selected && (
        <LeadDetail
          lead={selected}
          onClose={() => setSelectedId(null)}
          onEdit={() => setDialog({ lead: selected, stage: selected.stage })}
        />
      )}

      {dialog && (
        <LeadDialog lead={dialog.lead} defaultStage={dialog.stage} onClose={() => setDialog(null)} />
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none h-10 pl-3.5 pr-9 text-sm bg-white border border-[#EAECEF] text-[#374151] focus:outline-none focus:border-[#00C853] transition cursor-pointer"
        style={{ borderRadius: 12 }}
      >
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
    </div>
  );
}
