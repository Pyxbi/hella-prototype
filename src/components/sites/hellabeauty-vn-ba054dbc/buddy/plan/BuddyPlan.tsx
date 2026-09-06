"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { routineSteps, type BuddyAnswers } from "../buddyData";
import {
  DAYS,
  currentWeekDates,
  derivePlan,
  type PlanSession,
} from "./planLogic";
import {
  CheckIcon,
  CloseIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const fmtHour = (h: number) => `${h}:00`;

export function BuddyPlan({
  answers,
  boughtStepIds,
  onEdit,
  initialSessions,
  onPersist,
  onRestart,
}: {
  answers: BuddyAnswers;
  boughtStepIds: string[];
  onEdit: () => void;
  initialSessions?: PlanSession[];
  onPersist?: (sessions: PlanSession[]) => void;
  onRestart?: () => void;
}) {
  const [plan] = useState(() => derivePlan(answers));
  const [weekDates] = useState(() => currentWeekDates());
  const [sessions, setSessions] = useState<PlanSession[]>(
    initialSessions && initialSessions.length ? initialSessions : plan.sessions,
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Persist whenever the timetable changes (including once on mount).
  const persistRef = useRef(onPersist);
  useEffect(() => {
    persistRef.current = onPersist;
  }, [onPersist]);
  useEffect(() => {
    persistRef.current?.(sessions);
  }, [sessions]);

  const hours = plan.hourWindow;
  const selectedDayIds = [...new Set(sessions.map((s) => s.dayId))];
  const editing = sessions.find((s) => s.id === editingId) ?? null;

  const sessionAt = (dayId: number, hour: number) =>
    sessions.find((s) => s.dayId === dayId && s.hour === hour);

  const moveSession = (id: string, dayId: number, hour: number) => {
    if (sessions.some((s) => s.id !== id && s.dayId === dayId && s.hour === hour)) return;
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, dayId, hour } : s)));
    setSaved(false);
  };
  const addSession = (dayId: number, hour: number) => {
    if (sessionAt(dayId, hour)) return;
    setSessions((prev) => [
      ...prev,
      { id: `s-${dayId}-${hour}-${Date.now()}`, dayId, hour, steps: [...answers.steps] },
    ]);
    setSaved(false);
  };
  const removeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setEditingId(null);
    setSaved(false);
  };
  const toggleDay = (dayId: number) => {
    const has = sessions.some((s) => s.dayId === dayId);
    if (has) setSessions((prev) => prev.filter((s) => s.dayId !== dayId));
    else addSession(dayId, plan.hour);
    setSaved(false);
  };
  const toggleStep = (id: string, stepId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              steps: s.steps.includes(stepId)
                ? s.steps.filter((x) => x !== stepId)
                : [...s.steps, stepId],
            }
          : s,
      ),
    );
    setSaved(false);
  };
  const changeSlot = (id: string, dayId: number, hour: number) => moveSession(id, dayId, hour);

  const save = () => {
    onPersist?.(sessions);
    setSaved(true);
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-hella-green">
            Review &amp; Ready to Run
          </p>
          <h1 className="font-heading text-hella-green mt-3 text-3xl leading-tight sm:text-4xl">
            Kế hoạch chăm sóc của bạn đã sẵn sàng
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-black/60">
            Hella Sis đã soạn lịch riêng cho bạn. Bấm và kéo thả để di chuyển, nhấp vào lịch để
            chỉnh sửa các bước cho phù hợp hơn.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[210px_1fr_260px]">
          {/* LEFT — day selector */}
          <aside className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="font-heading text-base text-black">Chọn ngày chăm mình trong tuần</h2>
            <ul className="mt-4 space-y-2">
              {DAYS.map((d) => {
                const on = selectedDayIds.includes(d.id);
                return (
                  <li key={d.id}>
                    <button
                      onClick={() => toggleDay(d.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition",
                        on ? "border-hella-green bg-hella-cream text-hella-green" : "border-black/15 text-black/70 hover:border-hella-green",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          on ? "border-hella-green bg-hella-green text-white" : "border-black/25",
                        )}
                      >
                        {on && <CheckIcon className="h-3 w-3" />}
                      </span>
                      {d.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-black/50">
              Chăm mình đều đặn giúp bạn cảm nhận rõ sự thay đổi mỗi ngày ✿
            </p>
          </aside>

          {/* CENTER — timetable */}
          <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading flex items-center gap-2 text-lg text-black">
                My Timetable <SparkleIcon className="h-4 w-4 text-hella-green" />
              </h2>
              <span className="rounded-full bg-hella-cream px-3 py-1 text-xs text-black/60">Tuần này</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="min-w-[640px]">
                {/* header row */}
                <div className="grid grid-cols-[56px_repeat(7,1fr)]">
                  <div />
                  {DAYS.map((d) => (
                    <div
                      key={d.id}
                      className={cn(
                        "px-1 pb-2 text-center text-xs",
                        selectedDayIds.includes(d.id) ? "font-semibold text-hella-green" : "text-black/50",
                      )}
                    >
                      <div>{d.label}</div>
                      <div className="text-[10px] opacity-70">{weekDates[d.id]}</div>
                    </div>
                  ))}
                </div>
                {/* time rows */}
                {hours.map((h) => (
                  <div key={h} className="grid grid-cols-[56px_repeat(7,1fr)]">
                    <div className="border-t border-black/5 py-3 pr-2 text-right text-[11px] text-black/40">
                      {fmtHour(h)}
                    </div>
                    {DAYS.map((d) => {
                      const s = sessionAt(d.id, h);
                      const daySelected = selectedDayIds.includes(d.id);
                      return (
                        <div
                          key={d.id}
                          onDragOver={(e) => s ? undefined : e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (dragging) moveSession(dragging, d.id, h);
                          }}
                          onClick={() => !s && daySelected && addSession(d.id, h)}
                          className={cn(
                            "min-h-[52px] border-l border-t border-black/5 p-1",
                            daySelected && "bg-hella-cream/40",
                            !s && daySelected && "cursor-pointer",
                          )}
                        >
                          {s && (
                            <button
                              draggable
                              onDragStart={() => setDragging(s.id)}
                              onDragEnd={() => setDragging(null)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(s.id);
                              }}
                              className="flex h-full w-full cursor-grab flex-col justify-center rounded-lg bg-hella-green px-2 py-1.5 text-left text-white transition active:cursor-grabbing"
                            >
                              <span className="text-[11px] font-medium leading-tight">
                                Đã tới giờ chăm sóc bản thân ♡
                              </span>
                              <span className="text-[10px] opacity-80">{s.steps.length} bước</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-black/40">
              Bấm &amp; kéo thả để di chuyển · Nhấp vào buổi để chỉnh sửa các bước
            </p>
          </div>

          {/* RIGHT — overview */}
          <aside className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="font-heading text-base text-black">Tổng quan kế hoạch</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-black/50">Tần suất</dt>
                <dd className="font-medium text-black">{selectedDayIds.length} buổi / tuần</dd>
              </div>
              <div>
                <dt className="text-xs text-black/50">Thời gian mỗi buổi</dt>
                <dd className="font-medium text-black">15 – 20 phút</dd>
              </div>
              <div>
                <dt className="text-xs text-black/50">Mục tiêu</dt>
                <dd className="font-medium text-black">{plan.goal}</dd>
              </div>
              <div>
                <dt className="text-xs text-black/50">Thời gian dự kiến</dt>
                <dd className="font-heading text-hella-green text-2xl">{plan.weeks} tuần</dd>
              </div>
            </dl>
            <div className="mt-4 rounded-xl bg-hella-cream p-3 text-xs leading-relaxed text-black/70">
              Sau {plan.weeks} tuần, bạn sẽ thấy làn da và cơ thể mềm mịn, khoẻ khoắn và rạng rỡ
              hơn — sẵn sàng “Get your Her”! ✦
            </div>
            <button
              onClick={onEdit}
              className="mt-5 w-full rounded-full bg-hella-green py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Chỉnh lịch của tôi
            </button>
            <button
              onClick={save}
              className={cn(
                "mt-3 w-full rounded-full border py-2.5 text-sm font-medium transition",
                saved ? "border-hella-green bg-hella-cream text-hella-green" : "border-hella-green text-hella-green hover:bg-hella-cream",
              )}
            >
              {saved ? "Đã lưu kế hoạch ✓" : "Lưu kế hoạch"}
            </button>
            <Link
              href="/checkin"
              className="mt-3 block w-full rounded-full border border-black/15 py-2.5 text-center text-sm font-medium text-black/70 transition hover:border-hella-green hover:text-hella-green"
            >
              Mở bản check-in (Zalo)
            </Link>
            {onRestart && (
              <button
                onClick={onRestart}
                className="mt-3 w-full text-center text-xs text-black/50 underline transition hover:text-hella-green"
              >
                Thiết lập lại từ đầu
              </button>
            )}
          </aside>
        </div>

        {/* Timeline */}
        <div className="mt-12 rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="font-heading text-center text-lg text-hella-green">Lộ trình dự kiến</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { w: "Tuần 1 – 2", t: "Làm quen & thiết lập thói quen chăm sóc." },
              { w: `Tuần 3 – ${Math.max(3, plan.weeks - 2)}`, t: "Da và cơ thể bắt đầu cải thiện rõ rệt." },
              { w: `Tuần ${plan.weeks}`, t: "Get your Her — rạng rỡ & tự tin ✦" },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-hella-green text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="font-heading text-hella-green mt-3 text-sm">{m.w}</p>
                <p className="mt-1 text-xs text-black/60">{m.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Edit popover */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditingId(null)}>
          <div className="hella-slide-up w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg text-black">Chỉnh sửa buổi chăm sóc</h3>
              <button aria-label="Đóng" onClick={() => setEditingId(null)} className="text-black/40 hover:text-black">
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="text-xs text-black/60">
                Ngày
                <select
                  value={editing.dayId}
                  onChange={(e) => changeSlot(editing.id, Number(e.target.value), editing.hour)}
                  className="mt-1 w-full rounded-md border border-black/15 px-2 py-1.5 text-sm text-black outline-none focus:border-hella-green"
                >
                  {DAYS.map((d) => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-black/60">
                Giờ
                <select
                  value={editing.hour}
                  onChange={(e) => changeSlot(editing.id, editing.dayId, Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-black/15 px-2 py-1.5 text-sm text-black outline-none focus:border-hella-green"
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>{fmtHour(h)}</option>
                  ))}
                </select>
              </label>
            </div>

            <p className="mt-4 text-xs font-medium text-black/70">Các bước trong buổi</p>
            <div className="mt-2 space-y-1.5">
              {routineSteps.map((step) => {
                const on = editing.steps.includes(step.id);
                return (
                  <label key={step.id} className="flex cursor-pointer items-center gap-3 text-sm text-black/80">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        toggleStep(editing.id, step.id);
                      }}
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border transition",
                        on ? "border-hella-green bg-hella-green text-white" : "border-black/25",
                      )}
                    >
                      {on && <CheckIcon className="h-2.5 w-2.5" />}
                    </span>
                    {step.label}
                    {boughtStepIds.includes(step.id) && (
                      <span className="text-[10px] text-hella-green">· đã có</span>
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => removeSession(editing.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Xoá buổi này
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="rounded-full bg-hella-green px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
