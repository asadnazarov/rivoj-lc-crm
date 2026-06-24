import { useMemo, useState } from "react";
import { Send, Bot, Sparkles, MessageSquare, CalendarCheck, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHATS, STATUS_COLOR, type Chat, type ChatSource, type ChatStatus } from "./avtovoronkaData";

function SourceBadge({ source, size = 18 }: { source: ChatSource; size?: number }) {
  const tg = source === "Telegram";
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white shrink-0"
      style={{ width: size, height: size, background: tg ? "#229ED9" : "linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF)" }}
      title={source}
    >
      <Send className="text-white" style={{ width: size * 0.55, height: size * 0.55 }} />
    </span>
  );
}

export function Avtovoronka() {
  const [activeId, setActiveId] = useState(CHATS[0].id);
  const active = CHATS.find((c) => c.id === activeId) as Chat;

  const counts = useMemo(() => {
    const c = (s: ChatStatus) => CHATS.filter((x) => x.status === s).length;
    return {
      total: CHATS.length,
      konsultatsiya: c("Konsultatsiya"),
      probnik: c("Probnikga yozildi"),
      sotildi: c("Sotib oldi"),
    };
  }, []);

  return (
    <div className="flex-1 min-h-0 flex flex-col px-5 md:px-7 py-6 gap-4">
      {/* stat row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 shrink-0">
        <Stat icon={<MessageSquare className="h-5 w-5" />} label="Jami chatlar" value={counts.total} />
        <Stat icon={<Sparkles className="h-5 w-5" />} label="Konsultatsiya" value={counts.konsultatsiya} />
        <Stat icon={<CalendarCheck className="h-5 w-5" />} label="Probnikga yozildi" value={counts.probnik} />
        <Stat icon={<BadgeDollarSign className="h-5 w-5" />} label="Sotib oldi" value={counts.sotildi} />
      </div>

      {/* chat workspace */}
      <div className="flex-1 min-h-0 bg-white border border-[#EAECEF] overflow-hidden flex" style={{ borderRadius: 16 }}>
        {/* chat list */}
        <div className="w-[300px] shrink-0 border-r border-[#EAECEF] flex flex-col">
          <div className="px-4 py-3 border-b border-[#EAECEF] flex items-center gap-2 text-sm font-semibold text-[#111827]">
            <Bot className="h-4 w-4 text-[#00C853]" /> AI sotuvchi · Inbox
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {CHATS.map((c) => {
              const sc = STATUS_COLOR[c.status];
              return (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  className={cn("w-full text-left px-4 py-3 border-b border-[#F0F1F3] transition hover:bg-[#F5F6F8]",
                    c.id === activeId && "bg-[#EAFBF1] hover:bg-[#EAFBF1]")}>
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-[#EAFBF1] text-[#00963D] flex items-center justify-center text-sm font-bold">
                        {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 ring-2 ring-white rounded-full">
                        <SourceBadge source={c.source} size={15} />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#111827] truncate">{c.name}</span>
                        <span className="text-[11px] text-[#9CA3AF] shrink-0">{c.lastTime}</span>
                      </div>
                      <div className="text-xs text-[#9CA3AF] truncate">{c.messages[c.messages.length - 1].text}</div>
                    </div>
                  </div>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ background: sc.bg, color: sc.fg }}>{c.status}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* conversation */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-5 py-3 border-b border-[#EAECEF] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <SourceBadge source={active.source} size={26} />
              <div className="min-w-0">
                <div className="font-semibold text-[#111827] truncate">{active.name}</div>
                <div className="text-xs text-[#9CA3AF]">{active.source} · {active.lang}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#6B7280] bg-[#F5F6F8] px-2.5 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-[#00C853]" /> Daraja: {active.level}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: STATUS_COLOR[active.status].bg, color: STATUS_COLOR[active.status].fg }}>
                {active.status}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-3" style={{ background: "#FAFBFC" }}>
            {active.messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "bot" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[78%] px-3.5 py-2 text-sm shadow-[0_1px_2px_rgba(0,0,0,.05)]",
                  m.from === "bot" ? "bg-[#00C853] text-white" : "bg-white text-[#111827] border border-[#EAECEF]")}
                  style={{ borderRadius: 14, borderBottomRightRadius: m.from === "bot" ? 4 : 14, borderBottomLeftRadius: m.from === "client" ? 4 : 14 }}>
                  {m.from === "bot" && <div className="flex items-center gap-1 text-[11px] font-semibold opacity-90 mb-0.5"><Bot className="h-3 w-3" /> AI sotuvchi</div>}
                  <div>{m.text}</div>
                  <div className={cn("text-[10px] mt-0.5 text-right", m.from === "bot" ? "text-white/70" : "text-[#9CA3AF]")}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-[#EAECEF] flex items-center gap-2">
            <div className="flex-1 h-10 px-3.5 rounded-xl bg-[#F5F6F8] text-sm text-[#9CA3AF] flex items-center">
              AI sotuvchi avtomatik javob beradi…
            </div>
            <button className="h-10 w-10 rounded-xl bg-[#00C853] text-white flex items-center justify-center opacity-60 cursor-default">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white border border-[#EAECEF] p-4 flex items-center gap-3" style={{ borderRadius: 16 }}>
      <div className="h-10 w-10 rounded-xl bg-[#EAFBF1] flex items-center justify-center text-[#00C853]">{icon}</div>
      <div>
        <div className="num text-xl font-bold text-[#111827]">{value}</div>
        <div className="text-[13px] text-[#6B7280]">{label}</div>
      </div>
    </div>
  );
}
