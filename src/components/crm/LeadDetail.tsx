import { useState } from "react";
import {
  Phone, Send, GraduationCap, CalendarDays, User, X, ChevronDown,
  CheckCircle2, Circle, Pencil, RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { crmStore } from "@/lib/crmStore";
import { STAGES, REJECT_REASONS, type Lead, type Stage } from "@/data/leads";

const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<Stage, string>;

type Tab = "malumot" | "tarix" | "vazifalar";

interface Props {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

export function LeadDetail({ lead, onClose, onEdit }: Props) {
  const [tab, setTab] = useState<Tab>("malumot");
  const [menuOpen, setMenuOpen] = useState(false);
  const [comment, setComment] = useState(lead.comment);

  const saveComment = () => crmStore.update(lead.id, { comment });

  return (
    <div className="w-[360px] shrink-0 border-l border-[#EAECEF] bg-white flex flex-col h-full">
      {/* tabs */}
      <div className="flex items-center gap-1 px-4 pt-4 border-b border-[#EAECEF]">
        {([["malumot", "Ma'lumot"], ["tarix", "Tarix"], ["vazifalar", "Vazifalar"]] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "px-3 pb-3 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === id ? "border-[#00C853] text-[#111827]" : "border-transparent text-[#9CA3AF] hover:text-[#6B7280]",
            )}
          >
            {label}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onClose} className="mb-2 h-8 w-8 rounded-lg hover:bg-[#F5F6F8] flex items-center justify-center text-[#9CA3AF]">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
        {/* header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-semibold text-[#111827]">{lead.name}</h3>
          {lead.rejected ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#EF4444]">
              {lead.rejectReason}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAFBF1] text-[#00963D]">
              {STAGE_LABEL[lead.stage]}
            </span>
          )}
        </div>

        {tab === "malumot" && (
          <div className="space-y-3.5">
            <Row icon={<Phone className="h-4 w-4" />}>{lead.phone}</Row>
            <Row icon={<Send className="h-4 w-4" />}>{lead.telegram}</Row>
            <Row icon={<GraduationCap className="h-4 w-4" />}>{lead.course} · {lead.level}</Row>
            <Row icon={<User className="h-4 w-4" />}>Ustoz: {lead.teacher}</Row>
            <Row icon={<CalendarDays className="h-4 w-4" />}>{lead.nextContact}</Row>
            <Row icon={<User className="h-4 w-4" />}>Manba: {lead.source} · {lead.age} yosh</Row>

            <div className="pt-2">
              <div className="text-sm font-semibold text-[#111827] mb-2">Izoh</div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onBlur={saveComment}
                rows={4}
                className="w-full p-3 text-sm border border-[#EAECEF] focus:outline-none focus:border-[#00C853] resize-none"
                style={{ borderRadius: 12 }}
              />
            </div>
          </div>
        )}

        {tab === "tarix" && (
          <ol className="relative border-l border-[#EAECEF] ml-1.5 space-y-5">
            {lead.history.map((h, i) => (
              <li key={i} className="ml-5">
                <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-[#00C853] ring-4 ring-white" />
                <div className="text-sm font-medium text-[#111827]">{h.text}</div>
                <div className="num text-xs text-[#9CA3AF] mt-0.5">{h.at}</div>
              </li>
            ))}
          </ol>
        )}

        {tab === "vazifalar" && (
          <div className="space-y-2.5">
            {lead.tasks.length === 0 && <p className="text-sm text-[#9CA3AF]">Vazifalar yo'q.</p>}
            {lead.tasks.map((t) => (
              <div key={t.id} className="flex items-start gap-2.5 text-sm">
                {t.done ? <CheckCircle2 className="h-4 w-4 text-[#00C853] mt-0.5" /> : <Circle className="h-4 w-4 text-[#9CA3AF] mt-0.5" />}
                <div>
                  <div className={cn("text-[#111827]", t.done && "line-through text-[#9CA3AF]")}>{t.text}</div>
                  <div className="text-xs text-[#9CA3AF]">{t.due}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer actions */}
      <div className="p-4 border-t border-[#EAECEF] space-y-2">
        <button onClick={onEdit}
          className="w-full py-2.5 bg-[#F5F6F8] hover:bg-[#EAECEF] text-[#374151] text-sm font-semibold flex items-center justify-center gap-2 transition"
          style={{ borderRadius: 12 }}>
          <Pencil className="h-4 w-4" /> Tahrirlash
        </button>

        {lead.rejected ? (
          <button onClick={() => { crmStore.restore(lead.id); onClose(); }}
            className="w-full py-2.5 bg-[#00C853] hover:bg-[#00B248] text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
            style={{ borderRadius: 12 }}>
            <RotateCcw className="h-4 w-4" /> Pipeline'ga qaytarish
          </button>
        ) : (
          <div className="relative">
            <button onClick={() => setMenuOpen((v) => !v)}
              className="w-full py-2.5 bg-[#00C853] hover:bg-[#00B248] text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              style={{ borderRadius: 12 }}>
              Bosqichni o'zgartirish <ChevronDown className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute bottom-full mb-2 inset-x-0 bg-white border border-[#EAECEF] rounded-xl shadow-elevated overflow-hidden z-10">
                {STAGES.map((s) => (
                  <button key={s.id}
                    onClick={() => { crmStore.moveStage(lead.id, s.id); setMenuOpen(false); }}
                    className={cn("w-full text-left px-4 py-2.5 text-sm hover:bg-[#EAFBF1] transition",
                      s.id === lead.stage ? "text-[#00963D] font-semibold" : "text-[#374151]")}>
                    {s.label}
                  </button>
                ))}
                <div className="border-t border-[#EAECEF]" />
                <div className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Rad etish</div>
                {REJECT_REASONS.map((r) => (
                  <button key={r}
                    onClick={() => { crmStore.reject(lead.id, r); setMenuOpen(false); onClose(); }}
                    className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEE2E2] transition">
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-[#374151]">
      <span className="text-[#9CA3AF]">{icon}</span>
      <span className="num">{children}</span>
    </div>
  );
}
