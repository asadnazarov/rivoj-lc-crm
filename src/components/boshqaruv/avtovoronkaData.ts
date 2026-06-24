export type ChatSource = "Telegram" | "Instagram";
export type ChatStatus = "Konsultatsiya" | "Probnikga yozildi" | "To'lov kutilmoqda" | "Sotib oldi";

export interface Msg {
  from: "client" | "bot";
  text: string;
  time: string;
}

export interface Chat {
  id: string;
  name: string;
  source: ChatSource;
  status: ChatStatus;
  lang: string;       // qiziqqan kursi
  level: string;      // AI aniqlagan daraja
  lastTime: string;
  messages: Msg[];
}

export const STATUS_ORDER: ChatStatus[] = ["Konsultatsiya", "Probnikga yozildi", "To'lov kutilmoqda", "Sotib oldi"];

export const STATUS_COLOR: Record<ChatStatus, { bg: string; fg: string }> = {
  "Konsultatsiya":      { bg: "#F5F6F8", fg: "#6B7280" },
  "Probnikga yozildi":  { bg: "#FEF3C7", fg: "#B45309" },
  "To'lov kutilmoqda":  { bg: "#DBEAFE", fg: "#1D4ED8" },
  "Sotib oldi":         { bg: "#EAFBF1", fg: "#00963D" },
};

export const CHATS: Chat[] = [
  {
    id: "c1", name: "Aziza Yusupova", source: "Instagram", status: "Sotib oldi", lang: "Ingliz tili", level: "Elementary (A1)", lastTime: "14:32",
    messages: [
      { from: "client", text: "Assalomu alaykum, ingliz tili kurslari haqida ma'lumot bera olasizmi?", time: "14:10" },
      { from: "bot", text: "Va alaykum assalom! Albatta 😊 Rivoj LC'da ingliz tili 0 dan boshlanadi. Avval darajangizni aniqlab olaylik — oddiy savol: \"How are you?\" degan savolga javob yoza olasizmi?", time: "14:11" },
      { from: "client", text: "I am fine, and you?", time: "14:14" },
      { from: "bot", text: "Zo'r! Bu Elementary (A1) daraja. Sizga ertalabki yoki kechki smena qulayroqmi?", time: "14:15" },
      { from: "client", text: "Kechki, ishdan keyin", time: "14:20" },
      { from: "bot", text: "Ajoyib. Kechki guruh 18:00 da, oyiga 590 000 so'm. Bugun ro'yxatdan o'tsangiz birinchi oyga 15% chegirma 🎁 To'lovni karta orqali shu yerda qilsangiz bo'ladi.", time: "14:22" },
      { from: "client", text: "Bo'ldi, qabul qilaman", time: "14:30" },
      { from: "bot", text: "To'lov muvaffaqiyatli qabul qilindi ✅ Guruhga qo'shildingiz. Ustozingiz Diyorbek N. siz bilan bog'lanadi.", time: "14:32" },
    ],
  },
  {
    id: "c2", name: "Bobur Aliyev", source: "Telegram", status: "To'lov kutilmoqda", lang: "Koreys tili", level: "Boshlang'ich", lastTime: "13:48",
    messages: [
      { from: "client", text: "Koreys tili bormi?", time: "13:30" },
      { from: "bot", text: "Ha! Koreys tili TOPIK 1 va boshlang'ich guruhlar bor. Avval ko'rgan bo'lganmisiz?", time: "13:31" },
      { from: "client", text: "Yo'q, 0 dan", time: "13:35" },
      { from: "bot", text: "Unda boshlang'ich guruh ideal. Kechki smena 18:30, oyiga 650 000 so'm. To'lov havolasini yuboraymi?", time: "13:40" },
      { from: "client", text: "Ha yuboring", time: "13:46" },
      { from: "bot", text: "Mana to'lov havolasi 👉 pay.rivojlc.uz/k-1204 — to'lov qilingach avtomatik guruhga qo'shilasiz.", time: "13:48" },
    ],
  },
  {
    id: "c3", name: "Malika Hamidova", source: "Instagram", status: "Probnikga yozildi", lang: "Ingliz tili", level: "Pre-Intermediate (A2)", lastTime: "12:15",
    messages: [
      { from: "client", text: "Salom, pробный урок бор?", time: "12:00" },
      { from: "bot", text: "Salom! Ha, bepul ochiq dars bor 😊 Qaysi til sizni qiziqtiradi?", time: "12:01" },
      { from: "client", text: "Ingliz", time: "12:03" },
      { from: "bot", text: "Darajangizni bilish uchun: \"I have been learning English for two years\" — bu gapni tarjima qila olasizmi?", time: "12:04" },
      { from: "client", text: "Men ikki yildan beri ingliz tili o'rganyapman", time: "12:08" },
      { from: "bot", text: "Juda yaxshi, Pre-Intermediate (A2) daraja! Shanba 11:00 dagi ochiq darsga yozib qo'yaymi?", time: "12:10" },
      { from: "client", text: "Ha, yozing", time: "12:14" },
      { from: "bot", text: "Yozildingiz ✅ Shanba 11:00, 202-xona. Eslatma yuboramiz 🔔", time: "12:15" },
    ],
  },
  {
    id: "c4", name: "Sardor Qodirov", source: "Telegram", status: "Konsultatsiya", lang: "Arab tili", level: "Aniqlanmoqda", lastTime: "11:02",
    messages: [
      { from: "client", text: "Arab tili narxi qancha?", time: "10:58" },
      { from: "bot", text: "Assalomu alaykum! Arab tili A1 guruh oyiga 600 000 so'm, ertalabki smena 09:00. Diniy yoki suhbat yo'nalishi kerakmi?", time: "11:00" },
      { from: "client", text: "Suhbat uchun", time: "11:02" },
      { from: "bot", text: "Tushunarli 👍 Suhbat yo'nalishiga mos guruhimiz bor. Bepul ochiq darsga yozilasizmi?", time: "11:02" },
    ],
  },
  {
    id: "c5", name: "Nigora Saidova", source: "Instagram", status: "Sotib oldi", lang: "Rus tili", level: "O'rta (B1)", lastTime: "Kecha",
    messages: [
      { from: "client", text: "Русский язык курслари борми?", time: "09:20" },
      { from: "bot", text: "Ha, rus tili A2/B1 guruhlar bor 😊 Darajangizni aniqlaymiz: \"Расскажите о себе\" — javob bera olasizmi?", time: "09:21" },
      { from: "client", text: "Меня зовут Нигора, я работаю бухгалтером", time: "09:25" },
      { from: "bot", text: "B1 daraja! Kunduzgi 13:00 guruh mos keladi. Oyiga 560 000 so'm. Hozir to'lov qilsangiz joy bron qilamiz.", time: "09:28" },
      { from: "client", text: "Karта орqали тўлайман", time: "09:35" },
      { from: "bot", text: "To'lov qabul qilindi ✅ Xush kelibsiz! Madina R. guruhiga qo'shildingiz.", time: "09:36" },
    ],
  },
  {
    id: "c6", name: "Jahongir Tursunov", source: "Telegram", status: "Konsultatsiya", lang: "Ingliz tili", level: "Aniqlanmoqda", lastTime: "Kecha",
    messages: [
      { from: "client", text: "IELTS ga tayyorlaysizmi?", time: "16:40" },
      { from: "bot", text: "Ha! IELTS intensiv guruhimiz bor 🎯 Hozirgi darajangiz qanday — taxminan band ayta olasizmi?", time: "16:41" },
      { from: "client", text: "Bilmayman, hech test topshirmaganman", time: "16:45" },
      { from: "bot", text: "Hechqisi yo'q, bepul daraja aniqlash testidan o'tasiz. Qaysi kun qulay?", time: "16:46" },
    ],
  },
];
