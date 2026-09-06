"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizHerCards } from "./QuizHerCards";
import { QuizFrequencySlider } from "./QuizFrequencySlider";
import { QuizRoutineSteps } from "./QuizRoutineSteps";
import { QuizTimeOfDay } from "./QuizTimeOfDay";
import type { BuddyAnswers } from "./buddyData";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const TOTAL = 4;

const QUESTIONS = [
  { title: "“Her” mong muốn trong bạn là gì?", sub: "Bạn có thể chọn nhiều đáp án phù hợp." },
  { title: "Mỗi tuần, bạn thường dành bao nhiêu ngày cho một routine chăm sóc cơ thể trọn vẹn?", sub: "Chọn khoảng phù hợp nhất với bạn nhé!" },
  { title: "Routine chăm sóc hiện tại của bạn bao gồm các bước nào dưới đây?", sub: "Bạn có thể chọn nhiều đáp án phù hợp với mình." },
  { title: "Bạn thường dành thời gian chăm sóc bản thân vào lúc nào?", sub: "Chọn buổi và khung giờ bạn hay chăm sóc bản thân." },
];

export function BuddyQuiz({
  boughtStepIds,
  onComplete,
}: {
  boughtStepIds: string[];
  onComplete: (answers: BuddyAnswers) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<BuddyAnswers>({
    her: [],
    frequency: 2,
    steps: [...boughtStepIds],
    period: "evening",
    time: "7:00 CH",
  });

  const toggle = (key: "her" | "steps", id: string) =>
    setAnswers((a) => ({
      ...a,
      [key]: a[key].includes(id) ? a[key].filter((x) => x !== id) : [...a[key], id],
    }));

  const canContinue =
    (step === 0 && answers.her.length > 0) ||
    step === 1 ||
    (step === 2 && answers.steps.length > 0) ||
    step === 3;

  const q = QUESTIONS[step];

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1100px] px-5 py-14 lg:py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-hella-green">
          Câu hỏi {step + 1} / {TOTAL}
        </p>
        <h1 className="font-heading mx-auto mt-3 max-w-3xl text-center text-2xl leading-tight text-black sm:text-3xl">
          {q.title}
        </h1>
        <p className="mt-2 text-center text-sm text-black/50">{q.sub}</p>

        <div className="mt-10">
          {step === 0 && <QuizHerCards selected={answers.her} onToggle={(id) => toggle("her", id)} />}
          {step === 1 && (
            <QuizFrequencySlider value={answers.frequency} onChange={(i) => setAnswers((a) => ({ ...a, frequency: i }))} />
          )}
          {step === 2 && (
            <QuizRoutineSteps selected={answers.steps} onToggle={(id) => toggle("steps", id)} boughtStepIds={boughtStepIds} />
          )}
          {step === 3 && (
            <QuizTimeOfDay
              period={answers.period}
              time={answers.time}
              onChange={(period, time) => setAnswers((a) => ({ ...a, period, time }))}
            />
          )}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm text-black/70 transition hover:border-hella-green hover:text-hella-green"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Quay lại
            </button>
          )}
          <button
            disabled={!canContinue}
            onClick={() => (step < TOTAL - 1 ? setStep((s) => s + 1) : onComplete(answers))}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition",
              canContinue ? "bg-hella-green hover:opacity-90" : "cursor-not-allowed bg-black/20",
            )}
          >
            {step < TOTAL - 1 ? "Tiếp tục" : "Hoàn thành"}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
