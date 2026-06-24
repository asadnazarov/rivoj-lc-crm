// ── Rivoj LC — CRM lead model + mock data ──────────────────────────────

export type Stage = "yangi" | "qongiroq" | "ochiq" | "sotuv" | "otkaz";
export type Priority = "normal" | "muhim" | "muddati";
export type Source = "Target" | "Sayt" | "Sarafan" | "Avtovoronka";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "yangi",    label: "Yangi" },
  { id: "qongiroq", label: "Qo'ng'iroq qilindi" },
  { id: "ochiq",    label: "Ochiq dars" },
  { id: "sotuv",    label: "Sotuv" },
  { id: "otkaz",    label: "Otkaz" },
];

export const SOURCES: Source[] = ["Target", "Sayt", "Sarafan", "Avtovoronka"];

export const TEACHERS = ["Diyorbek N.", "Dilshod A.", "Madina R.", "Sardor T.", "Nigora K."];

// Rad etilgan (отказы) — columns = rejection reasons
export const REJECT_REASONS = [
  "Qimmat narx",
  "Lokatsiya to'g'ri kelmadi",
  "Ustoz yoqmadi",
] as const;
export type RejectReason = (typeof REJECT_REASONS)[number];

export interface HistoryEvent {
  text: string;
  at: string; // dd.mm.yyyy, HH:MM
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
  due: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  telegram: string;
  age: number;
  source: Source;
  course: string;       // e.g. "Ingliz tili"
  level: string;        // e.g. "Beginner"
  teacher: string;
  nextContact: string;  // "12 iyun, 18:00"
  stage: Stage;
  priority: Priority;
  comment: string;
  history: HistoryEvent[];
  tasks: Task[];
  rejected: boolean;
  rejectReason: RejectReason | null;
  createdAt: string;
}

// Courses = languages taught at the center
const COURSES: [string, string[]][] = [
  ["Ingliz tili", ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"]],
  ["Rus tili", ["Boshlang'ich", "O'rta", "Yuqori"]],
  ["Koreys tili", ["TOPIK 1", "TOPIK 2", "Boshlang'ich"]],
  ["Arab tili", ["Boshlang'ich", "O'rta"]],
];

let seq = 0;
const id = () => `ld_${(++seq).toString().padStart(3, "0")}`;

function mk(
  name: string,
  phone: string,
  courseIdx: number,
  levelIdx: number,
  stage: Stage,
  priority: Priority,
  source: Source,
  teacher: string,
  nextContact: string,
  comment: string,
  history: HistoryEvent[],
): Lead {
  const [course, levels] = COURSES[courseIdx];
  return {
    id: id(),
    name,
    phone,
    telegram: "@" + name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10),
    age: 16 + ((seq * 3) % 22),
    source,
    course,
    level: levels[levelIdx % levels.length],
    teacher,
    nextContact,
    stage,
    priority,
    comment,
    history,
    tasks: [],
    rejected: false,
    rejectReason: null,
    createdAt: history[0]?.at ?? "10.06.2025, 09:00",
  };
}

const H = (text: string, at: string): HistoryEvent => ({ text, at });

export const SEED_LEADS: Lead[] = [
  // ── Yangi ─────────────────────────────────────────────
  mk("Azizbek Tursunov", "+998 90 123 45 67", 0, 0, "yangi", "normal", "Target", "Diyorbek N.", "12 iyun, 18:00",
    "Targetdan keldi. Ingliz tilini 0 dan o'rganmoqchi.",
    [H("Lid yaratildi", "10.06.2025, 12:30")]),
  mk("Madina Karimova", "+998 93 456 78 90", 1, 0, "yangi", "muddati", "Avtovoronka", "Madina R.", "13 iyun, 17:00",
    "Avtovoronka orqali yozildi. Rus tili ish uchun.",
    [H("Lid yaratildi", "11.06.2025, 09:10")]),
  mk("Javohir Nematov", "+998 99 876 54 32", 2, 0, "yangi", "muhim", "Sarafan", "Sardor T.", "14 iyun, 16:00",
    "Tanishi tavsiya qilgan. Koreys tili.",
    [H("Lid yaratildi", "11.06.2025, 15:20")]),
  mk("Sardor Yusupov", "+998 91 234 56 78", 0, 2, "yangi", "normal", "Sayt", "Diyorbek N.", "14 iyun, 19:00",
    "Saytdan ariza qoldirdi.",
    [H("Lid yaratildi", "12.06.2025, 10:00")]),

  // ── Qo'ng'iroq qilindi ────────────────────────────────
  mk("Dilshoda Mahmudova", "+998 93 111 22 33", 0, 0, "qongiroq", "muddati", "Target", "Madina R.", "11 iyun, 15:30",
    "Narx va jadval haqida so'radi. Qayta qo'ng'iroq kerak.",
    [H("Lid yaratildi", "09.06.2025, 11:00"), H("Qo'ng'iroq qilindi", "09.06.2025, 14:20")]),
  mk("Oybek Qodirov", "+998 97 654 32 10", 2, 0, "qongiroq", "muhim", "Avtovoronka", "Sardor T.", "12 iyun, 14:00",
    "Koreys tiliga qiziqdi. Ochiq darsga taklif qilindi.",
    [H("Lid yaratildi", "09.06.2025, 16:30"), H("Qo'ng'iroq qilindi", "10.06.2025, 10:05")]),
  mk("Shahnoza Ibrohimova", "+998 90 222 33 44", 1, 0, "qongiroq", "muhim", "Sarafan", "Madina R.", "12 iyun, 16:30",
    "Ertalabki smenani so'radi.",
    [H("Lid yaratildi", "10.06.2025, 08:40"), H("Qo'ng'iroq qilindi", "10.06.2025, 12:00")]),
  mk("Bekzod Rahimov", "+998 99 333 44 55", 3, 0, "qongiroq", "normal", "Sarafan", "Sardor T.", "13 iyun, 11:00",
    "Arab tili, kechki smena.",
    [H("Lid yaratildi", "10.06.2025, 13:15"), H("Qo'ng'iroq qilindi", "11.06.2025, 09:30")]),

  // ── Ochiq dars ────────────────────────────────────────
  mk("Munisa Ergasheva", "+998 91 555 66 77", 0, 3, "ochiq", "normal", "Target", "Diyorbek N.", "15 iyun, 10:00",
    "Ochiq darsga keldi, mamnun bo'ldi.",
    [H("Lid yaratildi", "08.06.2025, 10:00"), H("Qo'ng'iroq qilindi", "08.06.2025, 15:00"), H("Ochiq dars o'tdi", "12.06.2025, 10:00")]),
  mk("Asilbek To'xtayev", "+998 97 222 11 00", 2, 1, "ochiq", "muhim", "Sayt", "Sardor T.", "15 iyun, 13:00",
    "Koreys tili TOPIK 2. Ochiq darsga yozildi.",
    [H("Lid yaratildi", "08.06.2025, 12:00"), H("Ochiq dars belgilandi", "11.06.2025, 18:00")]),
  mk("Diyorbek Holmirzayev", "+998 90 888 99 00", 0, 4, "ochiq", "muhim", "Avtovoronka", "Diyorbek N.", "12 iyun, 16:30",
    "Upper-Intermediate, IELTS maqsadi.",
    [H("Lid yaratildi", "07.06.2025, 14:00"), H("Ochiq dars o'tdi", "11.06.2025, 16:30")]),

  // ── Sotuv ─────────────────────────────────────────────
  mk("Nodira Yakubova", "+998 93 221 44 55", 0, 1, "sotuv", "normal", "Target", "Madina R.", "—",
    "To'lov qilindi, guruhga qo'shildi.",
    [H("Lid yaratildi", "05.06.2025, 09:00"), H("Ochiq dars o'tdi", "08.06.2025, 17:00"), H("Sotuv — to'lov qabul qilindi", "10.06.2025, 12:00")]),
  mk("Alisher Temirov", "+998 90 111 22 33", 2, 0, "sotuv", "normal", "Sarafan", "Sardor T.", "—",
    "Ota-onasi bilan kelishildi, to'lov qilindi.",
    [H("Lid yaratildi", "04.06.2025, 11:00"), H("Sotuv — to'lov qabul qilindi", "10.06.2025, 15:30")]),
  mk("Gulrux Jo'rayeva", "+998 97 444 55 66", 1, 0, "sotuv", "normal", "Avtovoronka", "Madina R.", "—",
    "Avtovoronka orqali to'lov qildi.",
    [H("Lid yaratildi", "03.06.2025, 10:00"), H("Sotuv — to'lov qabul qilindi", "09.06.2025, 14:00")]),
  mk("Temur Malikov", "+998 90 123 11 22", 0, 5, "sotuv", "normal", "Target", "Diyorbek N.", "—",
    "Advanced guruhga to'lov qildi.",
    [H("Lid yaratildi", "01.06.2025, 10:00"), H("Sotuv — to'lov qabul qilindi", "06.06.2025, 12:00")]),
  mk("Zarina Usmonova", "+998 93 444 22 11", 3, 0, "sotuv", "normal", "Sayt", "Nigora K.", "—",
    "Arab tili guruhiga yozildi.",
    [H("Lid yaratildi", "31.05.2025, 10:00"), H("Sotuv — to'lov qabul qilindi", "05.06.2025, 09:00")]),
];

// ── Otkaz (rejected) leads — stage "otkaz" + reason ───────
function rej(lead: Lead, reason: RejectReason, at: string): Lead {
  return {
    ...lead,
    stage: "otkaz",
    rejected: true,
    rejectReason: reason,
    history: [...lead.history, H(`Otkaz: ${reason}`, at)],
  };
}

export const SEED_REJECTED: Lead[] = [
  rej(mk("Kamol Rashidov", "+998 90 700 10 20", 0, 0, "qongiroq", "normal", "Target", "Diyorbek N.", "—",
    "Narxni qimmat deb topdi.", [H("Lid yaratildi", "02.06.2025, 10:00"), H("Qo'ng'iroq qilindi", "02.06.2025, 14:00")]),
    "Qimmat narx", "03.06.2025, 11:00"),
  rej(mk("Laylo Sobirova", "+998 93 700 30 40", 1, 0, "qongiroq", "normal", "Avtovoronka", "Madina R.", "—",
    "Filial uydan uzoq.", [H("Lid yaratildi", "01.06.2025, 09:00"), H("Qo'ng'iroq qilindi", "01.06.2025, 12:00")]),
    "Lokatsiya to'g'ri kelmadi", "04.06.2025, 16:00"),
  rej(mk("Otabek Yo'ldoshev", "+998 97 700 50 60", 2, 0, "ochiq", "normal", "Sayt", "Sardor T.", "—",
    "Ochiq darsdan keyin ustoz yoqmadi.", [H("Lid yaratildi", "28.05.2025, 12:00"), H("Ochiq dars o'tdi", "01.06.2025, 17:00")]),
    "Ustoz yoqmadi", "05.06.2025, 10:00"),
  rej(mk("Nilufar Ahmedova", "+998 90 700 70 80", 0, 1, "qongiroq", "normal", "Sarafan", "Madina R.", "—",
    "Narx byudjetga to'g'ri kelmadi.", [H("Lid yaratildi", "27.05.2025, 11:00"), H("Qo'ng'iroq qilindi", "28.05.2025, 10:00")]),
    "Qimmat narx", "30.05.2025, 09:00"),
  rej(mk("Jasur Komilov", "+998 99 700 90 10", 3, 0, "yangi", "normal", "Target", "Sardor T.", "—",
    "Boshqa tumanda yashaydi.", [H("Lid yaratildi", "26.05.2025, 15:00")]),
    "Lokatsiya to'g'ri kelmadi", "27.05.2025, 14:00"),
  rej(mk("Dilnoza Karimova", "+998 91 700 11 22", 2, 0, "ochiq", "normal", "Avtovoronka", "Diyorbek N.", "—",
    "Ustoz uslubi yoqmadi.", [H("Lid yaratildi", "25.05.2025, 10:00"), H("Ochiq dars o'tdi", "28.05.2025, 16:00")]),
    "Ustoz yoqmadi", "29.05.2025, 12:00"),
];

export const ALL_SEED = [...SEED_LEADS, ...SEED_REJECTED];
