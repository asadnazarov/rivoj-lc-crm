import {
  LayoutGrid, GitBranch, XCircle, LineChart, Wallet, GraduationCap, Bot, type LucideIcon,
} from "lucide-react";

export type Workspace = "crm" | "boshqaruv";

export type SectionId =
  | "kanban" | "pipeline" | "rad" | "analitika"   // CRM
  | "moliya" | "oquvchilar" | "avtovoronka";       // Boshqaruv

export interface NavItem {
  id: SectionId;
  label: string;
  sub: string;
  icon: LucideIcon;
}

export const WORKSPACES: { id: Workspace; label: string; sub: string }[] = [
  { id: "crm",       label: "CRM",       sub: "Lidlar va sotuv" },
  { id: "boshqaruv", label: "Boshqaruv", sub: "Moliya va o'quv jarayoni" },
];

export const NAV: Record<Workspace, NavItem[]> = {
  crm: [
    { id: "kanban",   label: "Kanban",       sub: "Lidlar voronkasi",   icon: LayoutGrid },
    { id: "pipeline", label: "Pipeline",     sub: "Barcha kontaktlar",  icon: GitBranch },
    { id: "rad",      label: "Rad etilgan",  sub: "Otkaz sabablari",    icon: XCircle },
    { id: "analitika",label: "Analitika",    sub: "Grafiklar va KPI",   icon: LineChart },
  ],
  boshqaruv: [
    { id: "moliya",      label: "Moliya",      sub: "Kassa va xarajatlar",  icon: Wallet },
    { id: "oquvchilar",  label: "O'quvchilar", sub: "Davomat va smenalar",  icon: GraduationCap },
    { id: "avtovoronka", label: "Avtovoronka", sub: "AI sotuvchi chatlari", icon: Bot },
  ],
};

export const SECTION_TITLE: Record<SectionId, string> = {
  kanban: "Kanban",
  pipeline: "Pipeline",
  rad: "Rad etilgan lidlar",
  analitika: "Analitika",
  moliya: "Moliya",
  oquvchilar: "O'quvchilar davomati",
  avtovoronka: "Avtovoronka — AI sotuvchi",
};

export const WORKSPACE_OF: Record<SectionId, Workspace> = {
  kanban: "crm", pipeline: "crm", rad: "crm", analitika: "crm",
  moliya: "boshqaruv", oquvchilar: "boshqaruv", avtovoronka: "boshqaruv",
};

export const DEFAULT_SECTION: Record<Workspace, SectionId> = {
  crm: "kanban",
  boshqaruv: "moliya",
};
