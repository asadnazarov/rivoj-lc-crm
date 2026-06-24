import { Search, Bell, X } from "lucide-react";

interface Props {
  title: string;
  search: string;
  onSearch: (v: string) => void;
  onLogout: () => void;
}

export function Topbar({ title, search, onSearch, onLogout }: Props) {
  return (
    <header className="h-[72px] shrink-0 flex items-center gap-4 px-5 md:px-7 border-b border-[#EAECEF] bg-white">
      <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">{title}</h1>
      <div className="flex-1" />
      <div className="relative hidden md:block" style={{ width: 320 }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Qidiruv..."
          className="w-full h-10 pl-9 pr-3 bg-[#F5F6F8] text-sm text-[#111827] placeholder:text-[#9CA3AF] border border-transparent focus:border-[#EAECEF] focus:bg-white focus:outline-none transition"
          style={{ borderRadius: 12 }}
        />
      </div>
      <button className="relative h-10 w-10 rounded-xl hover:bg-[#F5F6F8] flex items-center justify-center text-[#6B7280] transition">
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute top-1.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-[#00C853] text-white text-[10px] font-bold flex items-center justify-center">3</span>
      </button>
      <button onClick={onLogout} title="Chiqish"
        className="h-10 w-10 rounded-xl hover:bg-[#F5F6F8] flex items-center justify-center text-[#6B7280] transition">
        <X className="h-5 w-5" />
      </button>
    </header>
  );
}
