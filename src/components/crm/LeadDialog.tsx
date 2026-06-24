import { useState } from "react";
import { X } from "lucide-react";
import { crmStore } from "@/lib/crmStore";
import {
  STAGES, SOURCES, TEACHERS, type Lead, type Stage, type Priority, type Source,
} from "@/data/leads";

interface Props {
  /** lead to edit, or null to create */
  lead: Lead | null;
  /** stage to pre-select when creating */
  defaultStage?: Stage;
  onClose: () => void;
}

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "muhim", label: "Muhim" },
  { id: "muddati", label: "Muddati o'tgan" },
];

export function LeadDialog({ lead, defaultStage = "yangi", onClose }: Props) {
  const [f, setF] = useState({
    name: lead?.name ?? "",
    phone: lead?.phone ?? "+998 ",
    telegram: lead?.telegram ?? "",
    course: lead?.course ?? "Ingliz tili",
    level: lead?.level ?? "Beginner",
    teacher: lead?.teacher ?? TEACHERS[0],
    source: (lead?.source ?? "Facebook") as Source,
    nextContact: lead?.nextContact ?? "",
    priority: (lead?.priority ?? "normal") as Priority,
    stage: (lead?.stage ?? defaultStage) as Stage,
    age: lead?.age ?? 18,
    comment: lead?.comment ?? "",
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  const submit = () => {
    if (!f.name.trim()) return;
    if (lead) {
      crmStore.update(lead.id, { ...f });
    } else {
      crmStore.create({
        name: f.name, phone: f.phone, telegram: f.telegram || "@" + f.name.toLowerCase().replace(/\s/g, ""),
        course: f.course, level: f.level, teacher: f.teacher, source: f.source,
        nextContact: f.nextContact || "—", priority: f.priority, stage: f.stage, age: Number(f.age), comment: f.comment,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white shadow-elevated max-h-[90vh] overflow-y-auto scrollbar-thin"
        style={{ borderRadius: 24 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECEF]">
          <h3 className="text-lg font-semibold text-[#111827]">{lead ? "Lidni tahrirlash" : "Yangi lid"}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-lg hover:bg-[#F5F6F8] flex items-center justify-center text-[#9CA3AF]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Field label="Ism familiya"><Input value={f.name} onChange={(v) => set("name", v)} placeholder="Ism familiya" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefon"><Input value={f.phone} onChange={(v) => set("phone", v)} /></Field>
            <Field label="Telegram"><Input value={f.telegram} onChange={(v) => set("telegram", v)} placeholder="@username" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kurs"><Input value={f.course} onChange={(v) => set("course", v)} /></Field>
            <Field label="Daraja"><Input value={f.level} onChange={(v) => set("level", v)} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ustoz">
              <Select value={f.teacher} onChange={(v) => set("teacher", v)} options={TEACHERS.map((t) => [t, t])} />
            </Field>
            <Field label="Manba">
              <Select value={f.source} onChange={(v) => set("source", v as Source)} options={SOURCES.map((s) => [s, s])} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Keyingi aloqa"><Input value={f.nextContact} onChange={(v) => set("nextContact", v)} placeholder="12 iyun, 18:00" /></Field>
            <Field label="Yosh"><Input value={String(f.age)} onChange={(v) => set("age", Number(v) || 0)} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Bosqich">
              <Select value={f.stage} onChange={(v) => set("stage", v as Stage)} options={STAGES.map((s) => [s.id, s.label])} />
            </Field>
            <Field label="Prioritet">
              <Select value={f.priority} onChange={(v) => set("priority", v as Priority)} options={PRIORITIES.map((p) => [p.id, p.label])} />
            </Field>
          </div>
          <Field label="Izoh">
            <textarea value={f.comment} onChange={(e) => set("comment", e.target.value)} rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-[#EAECEF] focus:outline-none focus:border-[#00C853] resize-none"
              style={{ borderRadius: 12 }} />
          </Field>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[#EAECEF]">
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-[#F5F6F8] hover:bg-[#EAECEF] text-[#374151] text-sm font-semibold transition" style={{ borderRadius: 12 }}>
            Bekor qilish
          </button>
          <button onClick={submit}
            className="flex-1 py-2.5 bg-[#00C853] hover:bg-[#00B248] text-white text-sm font-semibold transition" style={{ borderRadius: 12 }}>
            {lead ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[#6B7280] mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm border border-[#EAECEF] focus:outline-none focus:border-[#00C853] transition"
      style={{ borderRadius: 12 }}
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 text-sm border border-[#EAECEF] bg-white focus:outline-none focus:border-[#00C853] transition"
      style={{ borderRadius: 12 }}
    >
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}
