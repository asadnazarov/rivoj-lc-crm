import { Construction } from "lucide-react";

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="h-16 w-16 rounded-2xl bg-[#EAFBF1] flex items-center justify-center text-[#00C853] mb-4">
        <Construction className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
      <p className="mt-1.5 text-sm text-[#9CA3AF] max-w-xs">
        Bu bo'lim demo versiyada keyinroq qo'shiladi.
      </p>
    </div>
  );
}
