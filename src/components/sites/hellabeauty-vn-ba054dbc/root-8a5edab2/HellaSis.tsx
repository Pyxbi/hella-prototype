"use client";

import { useMemo, useState } from "react";
import { HellaSisBar } from "./HellaSisBar";
import { HellaSisChat } from "./HellaSisChat";
import { ChatBubbleIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import {
  buildCombo,
  comboSteps,
  filterSuggestions,
  matchQuestion,
  sisFallback,
  type ComboAnswers,
  type SisAnswer,
  type SisMessage,
  type SisQA,
} from "./sisEngine";

let msgId = 0;
const nextId = () => `m${msgId++}`;

export function HellaSis() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<SisMessage[]>([]);
  const [mode, setMode] = useState<"chat" | "combo">("chat");
  const [comboStep, setComboStep] = useState(0);
  const [comboAnswers, setComboAnswers] = useState<ComboAnswers>({ goals: [] });
  const [comboSelected, setComboSelected] = useState<string[]>([]);

  const [barValue, setBarValue] = useState("");
  const [barOpen, setBarOpen] = useState(false);
  const [composerValue, setComposerValue] = useState("");

  const suggestions = useMemo(() => filterSuggestions(barValue), [barValue]);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
  const pushSis = (answer: SisAnswer) =>
    setMessages((m) => [...m, { id: nextId(), role: "sis", answer }]);

  const startCombo = () => {
    setComboAnswers({ goals: [] });
    setComboSelected([]);
    setComboStep(0);
    setMode("combo");
    pushSis({
      text: ["Tuyệt vời! Mình sẽ hỏi bạn 3 câu nhanh để gợi ý combo chuẩn nhất nhé ✦"],
    });
  };

  const answerFor = (qa: SisQA | null) => {
    if (qa?.flow === "combo") {
      startCombo();
    } else {
      pushSis(qa?.answer ?? sisFallback);
    }
  };

  const openFromLauncher = () => {
    setChatOpen(true);
    if (messages.length === 0) {
      pushSis({
        text: [
          "Chào bạn! Mình là Hella Sis 💚 Bạn muốn hỏi gì về chăm sóc da, tóc hay chọn mùi hương nào? Cứ nhập câu hỏi hoặc quay lên thanh tìm kiếm để xem gợi ý nhé ✦",
        ],
      });
    }
  };

  const handlePick = (qa: SisQA) => {
    setChatOpen(true);
    setBarOpen(false);
    setBarValue("");
    pushUser(qa.question);
    answerFor(qa);
  };

  const handleSubmit = (text: string) => {
    setChatOpen(true);
    setBarOpen(false);
    setBarValue("");
    setComposerValue("");
    pushUser(text);
    answerFor(matchQuestion(text));
  };

  const currentStep = mode === "combo" ? comboSteps[comboStep] : null;

  const advanceOrFinish = (answers: ComboAnswers) => {
    if (comboStep < comboSteps.length - 1) {
      const next = comboStep + 1;
      setComboStep(next);
      setComboSelected([]);
      pushSis({ text: [comboSteps[next].question] });
    } else {
      const result = buildCombo(answers);
      setMode("chat");
      pushSis(result);
    }
  };

  const handleComboSelect = (optionId: string) => {
    if (!currentStep) return;
    if (currentStep.multi) {
      setComboSelected((sel) => {
        if (sel.includes(optionId)) return sel.filter((s) => s !== optionId);
        if (currentStep.maxSelect && sel.length >= currentStep.maxSelect) return sel;
        return [...sel, optionId];
      });
      return;
    }
    // single-select: record + echo + advance
    const label = currentStep.options.find((o) => o.id === optionId)?.label ?? optionId;
    const answers: ComboAnswers = { ...comboAnswers, [currentStep.id]: optionId };
    setComboAnswers(answers);
    pushUser(label);
    advanceOrFinish(answers);
  };

  const handleComboNext = () => {
    if (!currentStep || comboSelected.length === 0) return;
    const labels = comboSelected
      .map((id) => currentStep.options.find((o) => o.id === id)?.label ?? id)
      .join(", ");
    const answers: ComboAnswers = { ...comboAnswers, goals: comboSelected };
    setComboAnswers(answers);
    pushUser(labels);
    advanceOrFinish(answers);
  };

  return (
    <>
      <HellaSisBar
        value={barValue}
        onChange={setBarValue}
        onSubmit={handleSubmit}
        open={barOpen}
        onOpenChange={setBarOpen}
        suggestions={suggestions}
        onPick={handlePick}
      />
      <HellaSisChat
        open={chatOpen}
        messages={messages}
        mode={mode}
        currentStep={currentStep}
        comboSelected={comboSelected}
        onComboSelect={handleComboSelect}
        onComboNext={handleComboNext}
        composerValue={composerValue}
        onComposerChange={setComposerValue}
        onComposerSubmit={handleSubmit}
        onClose={() => setChatOpen(false)}
      />
      {!chatOpen && (
        <button
          aria-label="Trò chuyện với Hella Sis"
          onClick={openFromLauncher}
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hella-green text-white shadow-lg transition-transform hover:scale-105"
        >
          <ChatBubbleIcon className="h-7 w-7" />
        </button>
      )}
    </>
  );
}
