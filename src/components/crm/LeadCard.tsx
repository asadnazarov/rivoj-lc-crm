import { Phone, Send, CalendarDays, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead, Priority } from "@/data/leads";

const PRIORITY_COLOR: Record<Priority, string> = {
  normal: "#00C853",
  muhim: "#F59E0B",
  muddati: "#EF4444",
};

interface Props {
  lead: Lead;
  onClick: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  dragging?: boolean;
}

export function LeadCard({ lead, onClick, onDragStart, dragging }: Props) {
  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(
        "group relative bg-white border border-[#EAECEF] cursor-pointer overflow-hidden transition-all",
        "hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,0,0,.07)]",
        dragging && "opacity-40",
      )}
      style={{ borderRadius: 16 }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: PRIORITY_COLOR[lead.priority] }} />
      <div className="pl-4 pr-3 py-3">
        <div className="text-sm font-semibold text-[#111827] leading-tight">{lead.name}</div>
        <div className="num mt-1.5 text-[13px] text-[#6B7280]">{lead.phone}</div>
        <div className="mt-1 text-[13px] text-[#6B7280]">{lead.course} · {lead.level}</div>
        <div className="mt-1 text-[13px] text-[#9CA3AF]">{lead.nextContact}</div>
        <div className="mt-2.5 flex items-center gap-1 text-[#9CA3AF]">
          <IconBtn><Phone className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn><Send className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn><CalendarDays className="h-3.5 w-3.5" /></IconBtn>
          <div className="flex-1" />
          <IconBtn><MoreVertical className="h-3.5 w-3.5" /></IconBtn>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-[#F5F6F8] hover:text-[#00C853] transition"
    >
      {children}
    </button>
  );
}
