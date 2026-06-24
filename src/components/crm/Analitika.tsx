import { useMemo } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { TrendingUp, Users, Target, Percent } from "lucide-react";
import { useLeads } from "@/lib/crmStore";
import { STAGES, SOURCES, type Stage } from "@/data/leads";

const GREEN = "#00C853";
const SOURCE_COLORS: Record<string, string> = {
  Target: "#00963D",
  Sayt: "#00C853",
  Sarafan: "#F59E0B",
  Avtovoronka: "#0EA5E9",
};

const TREND = [
  { month: "Yan", lidlar: 120, sotuv: 38 },
  { month: "Fev", lidlar: 145, sotuv: 47 },
  { month: "Mar", lidlar: 168, sotuv: 52 },
  { month: "Apr", lidlar: 190, sotuv: 61 },
  { month: "May", lidlar: 210, sotuv: 73 },
  { month: "Iyn", lidlar: 248, sotuv: 88 },
];

export function Analitika() {
  const leads = useLeads();

  const stats = useMemo(() => {
    const total = leads.length;
    const sotuv = leads.filter((l) => l.stage === "sotuv").length;
    const otkaz = leads.filter((l) => l.stage === "otkaz").length;
    const active = total - otkaz;
    const conv = total ? Math.round((sotuv / total) * 100) : 0;
    const byStage = STAGES.map((s) => ({ label: s.label, value: leads.filter((l) => l.stage === s.id).length, id: s.id }));
    const bySource = SOURCES.map((s) => ({ name: s, value: leads.filter((l) => l.source === s).length }));
    return { total, sotuv, otkaz, active, conv, byStage, bySource };
  }, [leads]);

  const stageColor = (id: Stage) => (id === "otkaz" ? "#EF4444" : id === "sotuv" ? "#00963D" : GREEN);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-5 md:px-7 py-6 space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi icon={<Users className="h-5 w-5" />} label="Jami lidlar" value={stats.total} delta="+18%" />
        <Kpi icon={<Target className="h-5 w-5" />} label="Faol lidlar" value={stats.active} delta="+9%" />
        <Kpi icon={<TrendingUp className="h-5 w-5" />} label="Sotuvlar" value={stats.sotuv} delta="+24%" />
        <Kpi icon={<Percent className="h-5 w-5" />} label="Konversiya" value={`${stats.conv}%`} delta="+3.2%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* trend */}
        <Card className="xl:col-span-2" title="Lidlar va sotuvlar dinamikasi">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={TREND} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={GREEN} stopOpacity={0.25} /><stop offset="100%" stopColor={GREEN} stopOpacity={0} /></linearGradient>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00963D" stopOpacity={0.3} /><stop offset="100%" stopColor="#00963D" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECEF" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #EAECEF", fontSize: 12 }} />
              <Area type="monotone" dataKey="lidlar" stroke={GREEN} strokeWidth={2.5} fill="url(#gL)" />
              <Area type="monotone" dataKey="sotuv" stroke="#00963D" strokeWidth={2.5} fill="url(#gS)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* by source */}
        <Card title="Lid kanallari">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={stats.bySource} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {stats.bySource.map((e) => <Cell key={e.name} fill={SOURCE_COLORS[e.name] ?? GREEN} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #EAECEF", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center -mt-2">
            {stats.bySource.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: SOURCE_COLORS[e.name] }} />
                {e.name} <span className="num font-semibold text-[#111827]">{e.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* funnel by stage */}
      <Card title="Voronka — bosqichlar bo'yicha">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={stats.byStage} margin={{ left: -18, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAECEF" vertical={false} />
            <XAxis dataKey="label" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} interval={0} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "#F5F6F8" }} contentStyle={{ borderRadius: 12, border: "1px solid #EAECEF", fontSize: 12 }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={64}>
              {stats.byStage.map((s) => <Cell key={s.id} fill={stageColor(s.id as Stage)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function Kpi({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string | number; delta: string }) {
  return (
    <div className="bg-white border border-[#EAECEF] p-4" style={{ borderRadius: 16 }}>
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-[#EAFBF1] flex items-center justify-center text-[#00C853]">{icon}</div>
        <span className="text-xs font-semibold text-[#00963D] bg-[#EAFBF1] px-2 py-0.5 rounded-full">{delta}</span>
      </div>
      <div className="num text-2xl font-bold text-[#111827] mt-3">{value}</div>
      <div className="text-[13px] text-[#6B7280]">{label}</div>
    </div>
  );
}

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#EAECEF] p-5 ${className ?? ""}`} style={{ borderRadius: 16 }}>
      <h3 className="text-sm font-semibold text-[#111827] mb-4">{title}</h3>
      {children}
    </div>
  );
}
