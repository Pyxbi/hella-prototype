"use client";

import { useState } from "react";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { BuddyLanding } from "./BuddyLanding";
import { BuddyOrderLookup } from "./BuddyOrderLookup";
import { BuddyQuiz } from "./BuddyQuiz";
import { BuddyResult } from "./BuddyResult";
import type { BuddyAnswers } from "./buddyData";

type Phase = "landing" | "order" | "quiz" | "result";

export function HellaBuddyPage() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [boughtStepIds, setBoughtStepIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<BuddyAnswers | null>(null);

  return (
    <>
      <Header />

      {phase === "landing" && <BuddyLanding onStart={() => setPhase("order")} />}

      {phase === "order" && (
        <BuddyOrderLookup
          onConfirm={(ids) => {
            setBoughtStepIds(ids);
            setPhase("quiz");
          }}
        />
      )}

      {phase === "quiz" && (
        <BuddyQuiz
          boughtStepIds={boughtStepIds}
          onComplete={(a) => {
            setAnswers(a);
            setPhase("result");
          }}
        />
      )}

      {phase === "result" && answers && (
        <BuddyResult answers={answers} boughtStepIds={boughtStepIds} onEdit={() => setPhase("quiz")} />
      )}

      <Footer />
    </>
  );
}
