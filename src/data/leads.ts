// ── Rivoj LC — CRM lead model + mock data ──────────────────────────────

export type Stage = "yangi" | "aloqaga" | "probniy" | "shartnoma" | "faol";
export type Priority = "normal" | "muhim" | "muddati";
export type Source = "Facebook" | "Instagram" | "Telegram" | "Tavsiya" | "Veb-sayt";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "yangi",     label: "Yangi" },
  { id: "aloqaga",   label: "Aloqaga chiqildi" },
  { id: "probniy",   label: "Probniy dars" },
  { id: "shartnoma", label: "Shartnoma" },
  { id: "faol",      label: "Faol o'quvchilar" },
];

export const SOURCES: Source[] = ["Facebook", "Instagram", "Telegram", "Tavsiya", "Veb-sayt"];

export const TEACHERS = ["Diyorbek N.", "Dilshod A.", "Madina R.", "Sardor T.", "Nigora K."];

// Rad etilgan (отказы) — columns = rejection reasons
export const REJECT_REASONS = [
  "Qimmat",
  "Javob bermadi",
  "Boshqa markazni tanladi",
  "Vaqti yo'q",
  "Qiziqmadi",
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

const COURSES: [string, string[]][] = [
  ["Ingliz tili", ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"]],
  ["Rus tili", ["Elementary", "Pre-Intermediate", "Intermediate"]],
  ["Matematika", ["O'rta", "Yuqori"]],
  ["Dasturlash", ["Python", "Frontend", "Backend"]],
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
  mk("Azizbek Tursunov", "+998 90 123 45 67", 0, 0, "yangi", "normal", "Facebook", "Diyorbek N.", "12 iyun, 18:00",
    "Telegram orqali murojaat qildi. Ingliz tilini 0 dan o'rganishni boshlamoqchi.",
    [H("Lid yaratildi", "10.06.2025, 12:30"), H("Aloqaga chiqildi", "10.06.2025, 12:45"), H("Probniy dars belgilandi", "10.06.2025, 13:00")]),
  mk("Madina Karimova", "+998 93 456 78 90", 1, 0, "yangi", "muddati", "Instagram", "Madina R.", "13 iyun, 17:00",
    "Reklama orqali keldi. Rus tilini ish uchun kerak.",
    [H("Lid yaratildi", "11.06.2025, 09:10")]),
  mk("Javohir Nematov", "+998 99 876 54 32", 2, 0, "yangi", "muhim", "Telegram", "Sardor T.", "14 iyun, 16:00",
    "Maktab o'quvchisi, matematikadan qo'shimcha dars.",
    [H("Lid yaratildi", "11.06.2025, 15:20")]),
  mk("Sardor Yusupov", "+998 91 234 56 78", 0, 2, "yangi", "normal", "Veb-sayt", "Diyorbek N.", "14 iyun, 19:00",
    "Saytdan ariza qoldirdi.",
    [H("Lid yaratildi", "12.06.2025, 10:00")]),

  // ── Aloqaga chiqildi ──────────────────────────────────
  mk("Dilshoda Mahmudova", "+998 93 111 22 33", 0, 0, "aloqaga", "muddati", "Facebook", "Madina R.", "11 iyun, 15:30",
    "Narx va jadval haqida so'radi. Qayta qo'ng'iroq kerak.",
    [H("Lid yaratildi", "09.06.2025, 11:00"), H("Aloqaga chiqildi", "09.06.2025, 14:20")]),
  mk("Oybek Qodirov", "+998 97 654 32 10", 3, 0, "aloqaga", "muhim", "Instagram", "Sardor T.", "12 iyun, 14:00",
    "Python kursiga qiziqdi. Demo dars taklif qilindi.",
    [H("Lid yaratildi", "09.06.2025, 16:30"), H("Aloqaga chiqildi", "10.06.2025, 10:05")]),
  mk("Shahnoza Ibrohimova", "+998 90 222 33 44", 1, 0, "aloqaga", "muhim", "Telegram", "Madina R.", "12 iyun, 16:30",
    "Ertalabki guruhni so'radi.",
    [H("Lid yaratildi", "10.06.2025, 08:40"), H("Aloqaga chiqildi", "10.06.2025, 12:00")]),
  mk("Bekzod Rahimov", "+998 99 333 44 55", 2, 0, "aloqaga", "normal", "Tavsiya", "Sardor T.", "13 iyun, 11:00",
    "Do'sti tavsiya qilgan.",
    [H("Lid yaratildi", "10.06.2025, 13:15"), H("Aloqaga chiqildi", "11.06.2025, 09:30")]),

  // ── Probniy dars ──────────────────────────────────────
  mk("Munisa Ergasheva", "+998 91 555 66 77", 0, 3, "probniy", "normal", "Facebook", "Diyorbek N.", "15 iyun, 10:00",
    "Probniy darsga keldi, mamnun bo'ldi.",
    [H("Lid yaratildi", "08.06.2025, 10:00"), H("Aloqaga chiqildi", "08.06.2025, 15:00"), H("Probniy dars o'tdi", "12.06.2025, 10:00")]),
  mk("Asilbek To'xtayev", "+998 97 222 11 00", 3, 1, "probniy", "muhim", "Veb-sayt", "Sardor T.", "15 iyun, 13:00",
    "Frontend yo'nalishi. Probniyga yozildi.",
    [H("Lid yaratildi", "08.06.2025, 12:00"), H("Probniy dars belgilandi", "11.06.2025, 18:00")]),
  mk("Diyorbek Holmirzayev", "+998 90 888 99 00", 0, 4, "probniy", "muhim", "Instagram", "Diyorbek N.", "12 iyun, 16:30",
    "Upper-Intermediate, IELTS maqsadi.",
    [H("Lid yaratildi", "07.06.2025, 14:00"), H("Probniy dars o'tdi", "11.06.2025, 16:30")]),

  // ── Shartnoma ─────────────────────────────────────────
  mk("Nodira Yakubova", "+998 93 221 44 55", 0, 1, "shartnoma", "normal", "Facebook", "Madina R.", "10 iyun, 17:00",
    "Shartnoma tayyorlanmoqda, to'lov kutilmoqda.",
    [H("Lid yaratildi", "05.06.2025, 09:00"), H("Probniy dars o'tdi", "08.06.2025, 17:00"), H("Shartnoma yuborildi", "10.06.2025, 12:00")]),
  mk("Alisher Temirov", "+998 90 111 22 33", 2, 0, "shartnoma", "muhim", "Tavsiya", "Sardor T.", "11 iyun, 18:00",
    "Ota-onasi bilan kelishildi.",
    [H("Lid yaratildi", "04.06.2025, 11:00"), H("Shartnoma yuborildi", "10.06.2025, 15:30")]),
  mk("Gulrux Jo'rayeva", "+998 97 444 55 66", 1, 0, "shartnoma", "muddati", "Instagram", "Madina R.", "12 iyun, 19:00",
    "To'lov muddati o'tib ketmoqda.",
    [H("Lid yaratildi", "03.06.2025, 10:00"), H("Shartnoma yuborildi", "09.06.2025, 14:00")]),

  // ── Faol o'quvchilar ──────────────────────────────────
  mk("Temur Malikov", "+998 90 123 11 22", 0, 5, "faol", "normal", "Facebook", "Diyorbek N.", "—",
    "Advanced guruhda o'qiydi. To'lov qilingan.",
    [H("Lid yaratildi", "01.05.2025, 10:00"), H("Shartnoma imzolandi", "10.05.2025, 12:00"), H("Faol o'quvchi", "12.05.2025, 09:00")]),
  mk("Zarina Usmonova", "+998 93 444 22 11", 3, 0, "faol", "normal", "Veb-sayt", "Sardor T.", "—",
    "Python guruhida faol.",
    [H("Lid yaratildi", "20.04.2025, 10:00"), H("Faol o'quvchi", "05.05.2025, 09:00")]),
  mk("Rahimjon Sodiqov", "+998 91 777 88 99", 2, 1, "faol", "normal", "Tavsiya", "Nigora K.", "—",
    "Yuqori matematika guruhi.",
    [H("Lid yaratildi", "18.04.2025, 10:00"), H("Faol o'quvchi", "02.05.2025, 09:00")]),
  mk("Sevinch Juraeva", "+998 90 555 44 33", 0, 2, "faol", "normal", "Instagram", "Madina R.", "—",
    "Pre-Intermediate, davom etmoqda.",
    [H("Lid yaratildi", "15.04.2025, 10:00"), H("Faol o'quvchi", "01.05.2025, 09:00")]),
];

// ── Rad etilgan (rejected) leads ──────────────────────────
function rej(lead: Lead, reason: RejectReason, at: string): Lead {
  return {
    ...lead,
    rejected: true,
    rejectReason: reason,
    history: [...lead.history, H(`Rad etildi: ${reason}`, at)],
  };
}

export const SEED_REJECTED: Lead[] = [
  rej(mk("Kamol Rashidov", "+998 90 700 10 20", 0, 0, "aloqaga", "normal", "Facebook", "Diyorbek N.", "—",
    "Narxni qimmat deb topdi.", [H("Lid yaratildi", "02.06.2025, 10:00"), H("Aloqaga chiqildi", "02.06.2025, 14:00")]),
    "Qimmat", "03.06.2025, 11:00"),
  rej(mk("Laylo Sobirova", "+998 93 700 30 40", 1, 0, "yangi", "normal", "Instagram", "Madina R.", "—",
    "Bir necha bor qo'ng'iroq qilindi, javob yo'q.", [H("Lid yaratildi", "01.06.2025, 09:00")]),
    "Javob bermadi", "04.06.2025, 16:00"),
  rej(mk("Otabek Yo'ldoshev", "+998 97 700 50 60", 3, 0, "probniy", "normal", "Veb-sayt", "Sardor T.", "—",
    "Boshqa markazda kurs boshladi.", [H("Lid yaratildi", "28.05.2025, 12:00"), H("Probniy dars o'tdi", "01.06.2025, 17:00")]),
    "Boshqa markazni tanladi", "05.06.2025, 10:00"),
  rej(mk("Nilufar Ahmedova", "+998 90 700 70 80", 0, 1, "aloqaga", "normal", "Telegram", "Madina R.", "—",
    "Hozircha vaqti yo'q, keyinroq.", [H("Lid yaratildi", "27.05.2025, 11:00"), H("Aloqaga chiqildi", "28.05.2025, 10:00")]),
    "Vaqti yo'q", "30.05.2025, 09:00"),
  rej(mk("Jasur Komilov", "+998 99 700 90 10", 2, 0, "yangi", "normal", "Facebook", "Sardor T.", "—",
    "Faqat narxni so'radi, qiziqmadi.", [H("Lid yaratildi", "26.05.2025, 15:00")]),
    "Qiziqmadi", "27.05.2025, 14:00"),
  rej(mk("Dilnoza Karimova", "+998 91 700 11 22", 0, 2, "aloqaga", "normal", "Instagram", "Diyorbek N.", "—",
    "Narx byudjetga to'g'ri kelmadi.", [H("Lid yaratildi", "25.05.2025, 10:00"), H("Aloqaga chiqildi", "25.05.2025, 16:00")]),
    "Qimmat", "26.05.2025, 12:00"),
];

export const ALL_SEED = [...SEED_LEADS, ...SEED_REJECTED];
