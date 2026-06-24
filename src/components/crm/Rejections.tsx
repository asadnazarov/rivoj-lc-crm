import { useMemo, useState } from "react";
import { useLeads, crmStore } from "@/lib/crmStore";
import { REJECT_REASONS, type RejectReason, type Lead } from "@/data/leads";
import { LeadCard } from "./LeadCard";
import { LeadDetail } from "./LeadDetail";
import { LeadDialog } from "./LeadDialog";

interface Props {
  search: string;
}

export function Rejections({ search }: Props) {
  const leads = useLeads();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [edit, setEdit] = useState<Lead | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const rejected = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => l.rejected && (!q || l.name.toLowerCase().includes(q) || l.phone.includes(q)));
  }, [leads, search]);

  const byReason = (r: RejectReason) => rejected.filter((l) => l.rejectReason === r);
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  const onDrop = (reason: RejectReason) => {
    if (dragId) crmStore.setReason(dragId, reason);
    setDragId(null);
  };

  return (
    <div className="flex-1 min-h-0 flex">
      <div className="flex-1 min-w-0 flex flex-col">
        <p className="text-sm text-[#6B7280] px-5 md:px-7 pt-5 pb-3">
          Rad etilgan lidlar — etaplar bu rad etish sabablari. Kartochkani sabablar orasida sudrab o'tkazing.
        </p>
        <div className="flex-1 min-h-0 overflow-x-auto scrollbar-thin px-5 md:px-7 pb-6">
          <div className="flex gap-4 h-full">
            {REJECT_REASONS.map((r) => {
              const items = byReason(r);
              return (
                <div
                  key={r}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(r)}
                  className="w-[300px] shrink-0 flex flex-col bg-[#F8FAFC] border border-[#EAECEF] overflow-hidden"
                  style={{ borderRadius: 16 }}
                >
                  <span className="h-1 bg-[#EF4444]" />
                  <div className="h-[52px] flex items-center gap-2 px-3.5 border-b border-[#EAECEF] bg-white">
                    <span className="text-sm font-semibold text-[#111827]">{r}</span>
                    <span className="num text-xs text-[#9CA3AF]">{items.length}</span>
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
                    {items.length === 0 && <div className="text-center text-xs text-[#9CA3AF] py-8">Bo'sh</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selected && <LeadDetail lead={selected} onClose={() => setSelectedId(null)} onEdit={() => setEdit(selected)} />}
      {edit && <LeadDialog lead={edit} onClose={() => setEdit(null)} />}
    </div>
  );
}
