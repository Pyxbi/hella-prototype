"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { BuddyLanding } from "./BuddyLanding";
import { BuddyOrderLookup } from "./BuddyOrderLookup";
import { BuddyQuiz } from "./BuddyQuiz";
import { BuddyPlan } from "./plan/BuddyPlan";
import type { PlanSession } from "./plan/planLogic";
import type { BuddyAnswers } from "./buddyData";

type Phase = "landing" | "order" | "quiz" | "result";
const STORAGE_KEY = "hella-buddy-plan";

interface SavedPlan {
  answers: BuddyAnswers;
  boughtStepIds: string[];
  sessions: PlanSession[];
}

export function HellaBuddyPage() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [boughtStepIds, setBoughtStepIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<BuddyAnswers | null>(null);
  const [savedSessions, setSavedSessions] = useState<PlanSession[] | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  // Load a previously saved plan → jump straight to the timetable.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedPlan;
        if (saved.answers) {
          setAnswers(saved.answers);
          setBoughtStepIds(saved.boughtStepIds ?? []);
          setSavedSessions(saved.sessions);
          setPhase("result");
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = (sessions: PlanSession[]) => {
    if (!answers) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, boughtStepIds, sessions } satisfies SavedPlan),
      );
    } catch {
      /* ignore */
    }
  };

  const restart = () => {
    setSavedSessions(undefined);
    setAnswers(null);
    setPhase("landing");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // Avoid a flash of the landing before hydration decides the phase.
  if (!hydrated) {
    return (
      <>
        <Header />
        <main className="flex-1" />
        <Footer />
      </>
    );
  }

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
            setSavedSessions(undefined);
            setPhase("result");
          }}
        />
      )}

      {phase === "result" && answers && (
        <BuddyPlan
          answers={answers}
          boughtStepIds={boughtStepIds}
          initialSessions={savedSessions}
          onPersist={persist}
          onEdit={() => setPhase("quiz")}
          onRestart={restart}
        />
      )}

      <Footer />
    </>
  );
}
