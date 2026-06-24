import {
  LayoutGrid, GitBranch, XCircle, Wallet, GraduationCap, Users,
  CreditCard, CheckSquare, MessageCircle, BarChart3, Settings, type LucideIcon,
} from "lucide-react";

export type SectionId =
  | "kanban" | "pipeline" | "rad" | "moliya"
  | "talabalar" | "guruhlar" | "tolovlar" | "vazifalar" | "xabarlar" | "hisobotlar" | "sozlamalar";

export interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  ready: boolean; // working screen vs placeholder
}

export const NAV: NavItem[] = [
  { id: "kanban",     label: "Kanban",      icon: LayoutGrid,     ready: true },
  { id: "pipeline",   label: "Pipeline",    icon: GitBranch,      ready: true },
  { id: "rad",        label: "Rad etilgan", icon: XCircle,        ready: true },
  { id: "moliya",     label: "Moliya",      icon: Wallet,         ready: true },
  { id: "talabalar",  label: "Talabalar",   icon: GraduationCap,  ready: false },
  { id: "guruhlar",   label: "Guruhlar",    icon: Users,          ready: false },
  { id: "tolovlar",   label: "To'lovlar",   icon: CreditCard,     ready: false },
  { id: "vazifalar",  label: "Vazifalar",   icon: CheckSquare,    ready: false },
  { id: "xabarlar",   label: "Xabarlar",    icon: MessageCircle,  ready: false },
  { id: "hisobotlar", label: "Hisobotlar",  icon: BarChart3,      ready: false },
  { id: "sozlamalar", label: "Sozlamalar",  icon: Settings,       ready: false },
];

export const SECTION_TITLE: Record<SectionId, string> = {
  kanban: "Kanban",
  pipeline: "Pipeline",
  rad: "Rad etilgan",
  moliya: "Moliya",
  talabalar: "Talabalar",
  guruhlar: "Guruhlar",
  tolovlar: "To'lovlar",
  vazifalar: "Vazifalar",
  xabarlar: "Xabarlar",
  hisobotlar: "Hisobotlar",
  sozlamalar: "Sozlamalar",
};
