import { useEffect, useState } from "react";
import { ALL_SEED, type Lead, type Stage, type RejectReason } from "@/data/leads";

const KEY = "rivoj:leads:v1";
const EVENT = "rivoj:leads:changed";

function now(): string {
  const d = new Date();
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function read(): Lead[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Lead[];
  } catch { /* ignore */ }
  return structuredClone(ALL_SEED);
}

function write(leads: Lead[]) {
  localStorage.setItem(KEY, JSON.stringify(leads));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export const crmStore = {
  all(): Lead[] {
    return read();
  },
  reset() {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent(EVENT));
  },
  moveStage(id: string, stage: Stage) {
    const leads = read();
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.stage === stage) return;
    lead.stage = stage;
    lead.history.push({ text: `Bosqich o'zgardi: ${stage}`, at: now() });
    write(leads);
  },
  reject(id: string, reason: RejectReason) {
    const leads = read();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    lead.rejected = true;
    lead.rejectReason = reason;
    lead.history.push({ text: `Rad etildi: ${reason}`, at: now() });
    write(leads);
  },
  setReason(id: string, reason: RejectReason) {
    const leads = read();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    lead.rejectReason = reason;
    lead.history.push({ text: `Rad sababi: ${reason}`, at: now() });
    write(leads);
  },
  restore(id: string) {
    const leads = read();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    lead.rejected = false;
    lead.rejectReason = null;
    lead.stage = "yangi";
    lead.history.push({ text: "Pipeline'ga qaytarildi", at: now() });
    write(leads);
  },
  update(id: string, patch: Partial<Lead>) {
    const leads = read();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) return;
    leads[idx] = { ...leads[idx], ...patch };
    write(leads);
  },
  create(lead: Omit<Lead, "id" | "history" | "tasks" | "rejected" | "rejectReason" | "createdAt">): Lead {
    const leads = read();
    const created: Lead = {
      ...lead,
      id: `ld_${Date.now()}`,
      history: [{ text: "Lid yaratildi", at: now() }],
      tasks: [],
      rejected: false,
      rejectReason: null,
      createdAt: now(),
    };
    leads.unshift(created);
    write(leads);
    return created;
  },
};

// Reactive hook — re-reads on any store change (and cross-tab storage events).
export function useLeads(): Lead[] {
  const [leads, setLeads] = useState<Lead[]>(() => read());
  useEffect(() => {
    const refresh = () => setLeads(read());
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return leads;
}
