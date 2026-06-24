import { useState } from "react";
import { Lock, LogIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

type Role = "boshliq" | "admin" | "ustoz";

const ROLES: { id: Role; label: string }[] = [
  { id: "boshliq", label: "Boshliq" },
  { id: "admin", label: "Admin" },
  { id: "ustoz", label: "Ustoz" },
];

const PASSWORDS: Record<Role, string> = {
  boshliq: "4455",
  admin: "7890",
  ustoz: "1221",
};

export function Login() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setPassword("");
    setError("");
  };

  const handleSubmit = () => {
    if (selectedRole && password === PASSWORDS[selectedRole]) {
      localStorage.setItem("role", selectedRole);
      window.location.reload();
    } else {
      setError("Parol noto'g'ri");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8FAFC" }}>
      <div className="w-full" style={{ maxWidth: 440 }}>
        <div className="flex justify-center" style={{ marginBottom: 40 }}>
          <Logo size={40} />
        </div>

        {!selectedRole ? (
          <div
            className="bg-white overflow-hidden"
            style={{ borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,.05)" }}
          >
            {ROLES.map((role, i) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                style={{ height: 72 }}
                className={cn(
                  "w-full flex items-center justify-between px-6 text-left transition-colors hover:bg-[#F5FBF8]",
                  i !== ROLES.length - 1 && "border-b border-[#EAECEF]",
                )}
              >
                <div className="flex items-center gap-3">
                  {role.id === "boshliq" ? (
                    <Lock className="h-[18px] w-[18px] text-[#00C853]" />
                  ) : (
                    <LogIn className="h-[18px] w-[18px] text-[#00C853]" />
                  )}
                  <span className="text-[15px] font-semibold text-[#111827]">{role.label}</span>
                </div>
                <Lock className="h-4 w-4 text-[#9CA3AF]" />
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6" style={{ borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,.05)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[17px] text-[#111827]">
                {ROLES.find((r) => r.id === selectedRole)?.label}
              </h3>
              <button
                onClick={() => setSelectedRole(null)}
                className="h-8 w-8 rounded-xl hover:bg-secondary flex items-center justify-center text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••"
                autoFocus
                className="w-full px-3.5 py-2.5 border border-[#EAECEF] bg-white text-sm focus:outline-none focus:border-[#00C853] transition"
                style={{ borderRadius: 12 }}
              />
              {error && <p className="text-xs text-[#EF4444] mt-1.5">{error}</p>}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-[#00C853] hover:bg-[#00B248] text-white text-sm font-semibold transition"
              style={{ borderRadius: 12 }}
            >
              Kirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
