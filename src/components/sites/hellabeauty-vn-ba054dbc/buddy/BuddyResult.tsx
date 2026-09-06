"use client";

import Image from "next/image";
import Link from "next/link";
import {
  frequencyStops,
  herOptions,
  routineSteps,
  type BuddyAnswers,
} from "./buddyData";
import {
  ArrowRightIcon,
  CheckIcon,
  MoonIcon,
  SparkleIcon,
  SunIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function BuddyResult({
  answers,
  boughtStepIds,
  onEdit,
}: {
  answers: BuddyAnswers;
  boughtStepIds: string[];
  onEdit: () => void;
}) {
  const herTitles = herOptions.filter((h) => answers.her.includes(h.id)).map((h) => h.title);
  const chosenSteps = routineSteps.filter((s) => answers.steps.includes(s.id));
  const gaps = routineSteps.filter(
    (s) => answers.steps.includes(s.id) && !boughtStepIds.includes(s.id),
  );

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1000px] px-5 py-14 lg:py-20">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hella-cream text-hella-green">
            <SparkleIcon className="h-7 w-7" />
          </span>
          <h1 className="font-heading text-hella-green mt-5 text-3xl leading-tight sm:text-5xl">
            Lịch nhắc nhở của bạn đã sẵn sàng
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/70 sm:text-base">
            Hella Sis sẽ đồng hành nhắc bạn giữ routine đều đặn. Kiên trì mỗi ngày, làn da của
            bạn sẽ cảm nhận được sự khác biệt ✦
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* schedule card */}
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="font-heading text-lg text-black">Lịch chăm sóc</h2>
            <div className="mt-4 flex items-center gap-3 text-sm text-black/80">
              {answers.period === "morning" ? <SunIcon className="h-5 w-5 text-hella-green" /> : <MoonIcon className="h-5 w-5 text-hella-green" />}
              <span>
                {answers.period === "morning" ? "Buổi sáng" : "Buổi tối"} · {answers.time}
              </span>
            </div>
            <p className="mt-3 text-sm text-black/60">
              Tần suất:{" "}
              <span className="font-medium text-black">{frequencyStops[answers.frequency]}</span>
            </p>
            {herTitles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {herTitles.map((t) => (
                  <span key={t} className="rounded-full border border-hella-green px-3 py-1 text-xs text-hella-green">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* routine steps card */}
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="font-heading text-lg text-black">Các bước routine</h2>
            <ul className="mt-4 space-y-2.5">
              {chosenSteps.map((s) => (
                <li key={s.id} className="flex items-center gap-3 text-sm text-black/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hella-green text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {s.label}
                  {boughtStepIds.includes(s.id) && (
                    <span className="text-xs text-hella-green">· Đã có sản phẩm</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* suggestions for gaps */}
        {gaps.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-center text-xl text-hella-green">
              Gợi ý hoàn thiện routine của bạn
            </h2>
            <p className="mt-1 text-center text-sm text-black/50">
              Một vài sản phẩm Hella cho các bước bạn chưa có.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gaps.map((s) => (
                <Link key={s.id} href={s.suggestHref} className="group">
                  <div className="relative aspect-square w-full overflow-hidden bg-[#f3efe8]">
                    <Image src={s.productImage} alt={s.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                  <h3 className="mt-3 text-sm text-black transition-colors group-hover:text-hella-green">
                    {s.label}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-hella-green">
                    Khám phá <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={onEdit}
            className="rounded-full border border-black/20 px-6 py-3 text-sm text-black/70 transition hover:border-hella-green hover:text-hella-green"
          >
            Chỉnh sửa
          </button>
          <Link
            href="/"
            className="rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Về trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
