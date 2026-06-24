export type Lang = "Ingliz" | "Rus" | "Koreys" | "Arab";
export type Shift = "Ertalabki" | "Kunduzgi" | "Kechki";

export interface Group {
  id: string;
  name: string;
  lang: Lang;
  level: string;
  shift: Shift;
  time: string;
  teacher: string;
  room: string;
  students: string[];
}

export const LANGS: Lang[] = ["Ingliz", "Rus", "Koreys", "Arab"];
export const SHIFTS: Shift[] = ["Ertalabki", "Kunduzgi", "Kechki"];

// 8 lesson days of the current period
export const DAYS = ["02.06", "04.06", "06.06", "09.06", "11.06", "13.06", "16.06", "18.06"];

export const GROUPS: Group[] = [
  {
    id: "eng-b1", name: "Ingliz B1", lang: "Ingliz", level: "Intermediate", shift: "Kechki", time: "18:00", teacher: "Diyorbek N.", room: "201",
    students: ["Azizbek Tursunov", "Madina Karimova", "Sardor Yusupov", "Munisa Ergasheva", "Javohir Nematov", "Sevinch Juraeva"],
  },
  {
    id: "eng-a1", name: "Ingliz A1", lang: "Ingliz", level: "Beginner", shift: "Ertalabki", time: "08:00", teacher: "Madina R.", room: "202",
    students: ["Dilshoda Mahmudova", "Nodira Yakubova", "Gulrux Jo'rayeva", "Temur Malikov", "Laylo Sobirova"],
  },
  {
    id: "rus-a2", name: "Rus tili A2", lang: "Rus", level: "O'rta", shift: "Kunduzgi", time: "13:00", teacher: "Madina R.", room: "105",
    students: ["Shahnoza Ibrohimova", "Bekzod Rahimov", "Nilufar Ahmedova", "Kamol Rashidov"],
  },
  {
    id: "kor-t1", name: "Koreys TOPIK 1", lang: "Koreys", level: "TOPIK 1", shift: "Kechki", time: "18:30", teacher: "Sardor T.", room: "301",
    students: ["Oybek Qodirov", "Asilbek To'xtayev", "Otabek Yo'ldoshev", "Dilnoza Karimova", "Jasur Komilov"],
  },
  {
    id: "arab-a1", name: "Arab tili A1", lang: "Arab", level: "Boshlang'ich", shift: "Ertalabki", time: "09:00", teacher: "Nigora K.", room: "108",
    students: ["Zarina Usmonova", "Alisher Temirov", "Rahimjon Sodiqov"],
  },
];

// Deterministic seed: most present, a few absences scattered.
export function seedPresent(groupId: string, student: string, day: string): boolean {
  let h = 0;
  const s = groupId + student + day;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 7 !== 0; // ~1 in 7 absent
}
