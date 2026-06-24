import { useMemo, useState } from "react";
import { Check, X, Clock, Users, MapPin, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GROUPS, LANGS, SHIFTS, DAYS, seedPresent, type Lang, type Shift } from "./attendanceData";

const KEY = "rivoj:attendance:v1";

type Overrides = Record<string, boolean>; // `${groupId}|${student}|${day}` -> present

function loadOverrides(): Overrides {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}

const LANG_COLOR: Record<Lang, string> = {
  Ingliz: "#00C853", Rus: "#0EA5E9", Koreys: "#8B5CF6", Arab: "#F59E0B",
};

export function Oquvchilar() {
  const [lang, setLang] = useState<Lang | "all">("all");
  const [shift, setShift] = useState<Shift | "all">("all");
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);

  const groups = useMemo(
    () => GROUPS.filter((g) => (lang === "all" || g.lang === lang) && (shift === "all" || g.shift === shift)),
    [lang, shift],
  );
  const [groupId, setGroupId] = useState(GROUPS[0].id);
  const group = groups.find((g) => g.id === groupId) ?? groups[0] ?? GROUPS[0];

  const present = (student: string, day: string) => {
    const k = `${group.id}|${student}|${day}`;
    return k in overrides ? overrides[k] : seedPresent(group.id, student, day);
  };

  const toggle = (student: string, day: string) => {
    const k = `${group.id}|${student}|${day}`;
    const next = { ...overrides, [k]: !present(student, day) };
    setOverrides(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const rate = (student: string) => {
    const p = DAYS.filter((d) => present(student, d)).length;
    return Math.round((p / DAYS.length) * 100);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-5 md:px-7 py-6 space-y-5">
      {/* filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Pill active={lang === "all"} onClick={() => setLang("all")}>Barcha tillar</Pill>
        {LANGS.map((l) => <Pill key={l} active={lang === l} onClick={() => setLang(l)} dot={LANG_COLOR[l]}>{l}</Pill>)}
        <span className="w-px h-6 bg-[#EAECEF] mx-1" />
        <Pill active={shift === "all"} onClick={() => setShift("all")}>Barcha smenalar</Pill>
        {SHIFTS.map((s) => <Pill key={s} active={shift === s} onClick={() => setShift(s)}>{s}</Pill>)}
      </div>

      {/* group cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setGroupId(g.id)}
            className={cn("text-left bg-white border p-4 transition-all hover:-translate-y-0.5",
              g.id === group?.id ? "border-[#00C853] ring-1 ring-[#00C853]" : "border-[#EAECEF]")}
            style={{ borderRadius: 18 }}
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: LANG_COLOR[g.lang] + "22", color: LANG_COLOR[g.lang] }}>{g.lang}</span>
              <span className="text-xs text-[#9CA3AF]">{g.level}</span>
            </div>
            <div className="mt-2 font-semibold text-[#111827]">{g.name}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{g.students.length}</span>
              <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{g.teacher}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{g.shift} · {g.time}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{g.room}-xona</span>
            </div>
          </button>
        ))}
      </div>

      {/* attendance grid */}
      {group && (
        <div className="bg-white border border-[#EAECEF] overflow-hidden" style={{ borderRadius: 16 }}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EAECEF]">
            <div>
              <div className="font-semibold text-[#111827]">{group.name} · davomat</div>
              <div className="text-xs text-[#9CA3AF]">{group.teacher} · {group.shift} {group.time} · {group.room}-xona</div>
            </div>
            <div className="text-xs text-[#6B7280]">Bor / yo'q — belgilash uchun bosing</div>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-[#6B7280]">
                  <th className="text-left font-medium px-5 py-3 sticky left-0 bg-white z-10">O'quvchi</th>
                  {DAYS.map((d) => <th key={d} className="num font-medium px-2 py-3 text-center whitespace-nowrap">{d}</th>)}
                  <th className="font-medium px-4 py-3 text-center">Davomat</th>
                </tr>
              </thead>
              <tbody>
                {group.students.map((st) => {
                  const r = rate(st);
                  return (
                    <tr key={st} className="border-t border-[#F0F1F3]">
                      <td className="px-5 py-2.5 font-medium text-[#111827] whitespace-nowrap sticky left-0 bg-white">{st}</td>
                      {DAYS.map((d) => {
                        const p = present(st, d);
                        return (
                          <td key={d} className="px-2 py-2.5 text-center">
                            <button
                              onClick={() => toggle(st, d)}
                              title={p ? "Bor" : "Yo'q"}
                              className={cn("h-7 w-7 rounded-lg inline-flex items-center justify-center transition",
                                p ? "bg-[#EAFBF1] text-[#00C853] hover:bg-[#D8F7E5]" : "bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FECACA]")}
                            >
                              {p ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-4 py-2.5 text-center">
                        <span className={cn("num font-semibold", r >= 80 ? "text-[#00963D]" : r >= 60 ? "text-[#F59E0B]" : "text-[#EF4444]")}>{r}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Pill({ active, onClick, children, dot }: { active: boolean; onClick: () => void; children: React.ReactNode; dot?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-sm font-medium border transition",
        active ? "bg-[#EAFBF1] border-[#00C853] text-[#111827]" : "bg-white border-[#EAECEF] text-[#6B7280] hover:bg-[#F5F6F8]")}
    >
      {dot && <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />}
      {children}
    </button>
  );
}
