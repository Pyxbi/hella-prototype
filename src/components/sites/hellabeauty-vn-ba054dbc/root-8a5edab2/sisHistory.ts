import { buildCombo, comboSteps, matchQuestion, sisFallback, type ComboAnswers, type SisMessage } from "./sisEngine";

export interface SisConversation {
  id: string;
  title: string;
  updatedAt: number;
  messages: SisMessage[];
  combo?: { step: number; answers: ComboAnswers; selected: string[] };
}

export function createConversation(text: string): SisConversation {
  return addMessage({ id: crypto.randomUUID(), title: text.trim().slice(0, 70), updatedAt: Date.now(), messages: [] }, text);
}

export function addMessage(chat: SisConversation, text: string): SisConversation {
  if (!text.trim()) return chat;
  const qa = matchQuestion(text.trim());
  const combo = qa?.flow === "combo" ? { step: 0, answers: { goals: [] }, selected: [] } : undefined;
  return {
    ...chat,
    updatedAt: Date.now(),
    combo,
    messages: [...chat.messages,
      { id: crypto.randomUUID(), role: "user", text: text.trim() },
      { id: crypto.randomUUID(), role: "sis", answer: combo ? { text: ["Mình cùng tìm một routine thật hợp với bạn nhé. Chỉ cần ba câu hỏi nhỏ để bắt đầu."] } : qa?.answer ?? sisFallback },
    ],
  };
}

export function chooseComboOption(chat: SisConversation, optionId?: string): SisConversation {
  if (!chat.combo) return chat;
  const { step, answers, selected } = chat.combo;
  const current = comboSteps[step];
  const option = current.options.find((item) => item.id === optionId);
  if (current.multi && option) {
    const next = selected.includes(optionId!) ? selected.filter((id) => id !== optionId) : [...selected, optionId!];
    if (next.length > (current.maxSelect ?? Infinity)) return chat;
    return { ...chat, combo: { ...chat.combo, selected: next } };
  }
  if ((!current.multi && !option) || (current.multi && !selected.length)) return chat;
  const nextAnswers = current.multi ? { ...answers, goals: selected } : { ...answers, [current.id]: optionId };
  const label = current.multi ? current.options.filter((item) => selected.includes(item.id)).map((item) => item.label).join(", ") : option!.label;
  const finished = step === comboSteps.length - 1;
  return {
    ...chat, updatedAt: Date.now(),
    combo: finished ? undefined : { step: step + 1, answers: nextAnswers, selected: [] },
    messages: [...chat.messages,
      { id: crypto.randomUUID(), role: "user", text: label },
      { id: crypto.randomUUID(), role: "sis", answer: finished ? buildCombo(nextAnswers) : { text: [comboSteps[step + 1].question] } },
    ],
  };
}

export function parseHistory(raw: string | null): SisConversation[] {
  try {
    const value = JSON.parse(raw ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((chat): chat is SisConversation =>
      chat && typeof chat.id === "string" && typeof chat.title === "string" && typeof chat.updatedAt === "number" &&
      Array.isArray(chat.messages) && chat.messages.every((m: SisMessage) => m && typeof m.id === "string" &&
        (m.role === "user" ? typeof m.text === "string" : m.role === "sis" && Array.isArray(m.answer?.text) && m.answer.text.every((t) => typeof t === "string"))) &&
      (!chat.combo || (Number.isInteger(chat.combo.step) && chat.combo.step >= 0 && chat.combo.step < comboSteps.length && Array.isArray(chat.combo.answers?.goals) && Array.isArray(chat.combo.selected))),
    );
  } catch { return []; }
}

const STORAGE_KEY = "hella-sis-conversations-v1";
const CHANGE_EVENT = "hella-sis-history-change";
let memory: string | null = null;
let storageUnavailable = false;

export function getHistorySnapshot(): string | null {
  if (storageUnavailable) return memory;
  try { return window.localStorage.getItem(STORAGE_KEY); }
  catch { return memory; }
}
export function getServerHistorySnapshot() { return null; }
export function isHistoryTemporary() { return storageUnavailable; }
export function subscribeHistory(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}
export function saveConversation(chat: SisConversation) {
  const chats = parseHistory(getHistorySnapshot()).filter((item) => item.id !== chat.id);
  memory = JSON.stringify([chat, ...chats].sort((a, b) => b.updatedAt - a.updatedAt));
  try { window.localStorage.setItem(STORAGE_KEY, memory); storageUnavailable = false; }
  catch { storageUnavailable = true; }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
