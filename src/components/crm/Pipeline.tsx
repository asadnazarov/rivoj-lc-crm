import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useLeads } from "@/lib/crmStore";
import { STAGES, type Stage } from "@/data/leads";
import { LeadDetail } from "./LeadDetail";
import { LeadDialog } from "./LeadDialog";
import type { Lead } from "@/data/leads";

const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<Stage, string>;

interface Props {
  search: string;
}

export function Pipeline({ search }: Props) {
  const leads = useLeads();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [edit, setEdit] = useState<Lead | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => !q || l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.course.toLowerCase().includes(q));
  }, [leads, search]);

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="flex-1 min-h-0 flex">
      <div className="flex-1 min-w-0 overflow-auto scrollbar-thin px-5 md:px-7 py-5">
        <p className="text-sm text-[#6B7280] mb-4">Barcha lidlar tarixi — {rows.length} ta kontakt</p>
        <div className="bg-white border border-[#EAECEF] overflow-hidden" style={{ borderRadius: 16 }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B7280] border-b border-[#EAECEF] bg-[#FAFAFA]">
                <Th>Ism</Th><Th>Telefon</Th><Th>Kurs</Th><Th>Ustoz</Th><Th>Bosqich</Th><Th>Manba</Th><Th>Sana</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className="border-b border-[#F0F1F3] last:border-0 hover:bg-[#FAFAFA] cursor-pointer"
                  style={{ height: 56 }}
                >
                  <Td className="font-medium text-[#111827]">{l.name}</Td>
                  <Td className="num text-[#6B7280]">{l.phone}</Td>
                  <Td className="text-[#6B7280]">{l.course} · {l.level}</Td>
                  <Td className="text-[#6B7280]">{l.teacher}</Td>
                  <Td>
                    {l.rejected ? (
                      <Badge className="bg-[#FEE2E2] text-[#EF4444]">{l.rejectReason}</Badge>
                    ) : (
                      <Badge className="bg-[#EAFBF1] text-[#00963D]">{STAGE_LABEL[l.stage]}</Badge>
                    )}
                  </Td>
                  <Td className="text-[#6B7280]">{l.source}</Td>
                  <Td className="num text-[#9CA3AF]">{l.createdAt}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <LeadDetail lead={selected} onClose={() => setSelectedId(null)} onEdit={() => setEdit(selected)} />
      )}
      {edit && <LeadDialog lead={edit} onClose={() => setEdit(null)} />}
    </div>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 font-medium whitespace-nowrap">{children}</th>;
const Td = ({ children, className }: { children: React.ReactNode; className?: string }) => <td className={cn("px-4 whitespace-nowrap", className)}>{children}</td>;
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", className)}>{children}</span>
);
