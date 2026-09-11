"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { BuddyLanding } from "./BuddyLanding";
import { BuddyOrderLookup } from "./BuddyOrderLookup";
import { BuddyQuiz } from "./BuddyQuiz";
import { BuddyPlan } from "./plan/BuddyPlan";
import Link from "next/link";
import { useAccount } from "../account/AccountContext";
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
  const { user, hydrated: accountHydrated } = useAccount();
  const [phase, setPhase] = useState<Phase>("landing");
  const [boughtStepIds, setBoughtStepIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<BuddyAnswers | null>(null);
  const [savedSessions, setSavedSessions] = useState<PlanSession[] | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  // Load a previously saved plan → jump straight to the timetable.
  // One-time hydration from localStorage (unavailable during SSR).
  /* eslint-disable react-hooks/set-state-in-effect */
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
  /* eslint-enable react-hooks/set-state-in-effect */

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
  if (!accountHydrated || !hydrated) {
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

      {!user ? (
        <main className="flex flex-1 items-center justify-center bg-hella-cream px-5 py-16 lg:py-24">
          <section className="w-full max-w-xl rounded-3xl border border-black/10 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hella-cream text-hella-green">
              ✦
            </span>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-black/45">
              Hella Sis · Routine Companion
            </p>
            <h1 className="font-heading mt-3 text-3xl leading-tight text-hella-green sm:text-4xl">
              Để Hella Sis đồng hành cùng bạn
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/60">
              Tạo tài khoản hoặc đăng nhập để thiết lập routine riêng, lưu lịch nhắc nhở và
              quay lại timetable của bạn bất cứ lúc nào.
            </p>
            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row">
              <Link
                href="/pages/tai-khoan"
                className="flex-1 rounded-full bg-hella-green px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Tạo tài khoản
              </Link>
              <Link
                href="/pages/tai-khoan?mode=login"
                className="flex-1 rounded-full border border-hella-green px-5 py-3 text-sm font-medium text-hella-green transition hover:bg-hella-cream"
              >
                Đăng nhập
              </Link>
            </div>
          </section>
        </main>
      ) : (
        <>
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
        </>
      )}

      <Footer />
    </>
  );
}
