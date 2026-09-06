"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { routineSteps, type IconName } from "./buddyData";
import {
  BodyWashIcon,
  CheckIcon,
  FaceCareIcon,
  HairIcon,
  LotionIcon,
  MistIcon,
  ScrubIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const ICONS: Record<IconName, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  bodywash: BodyWashIcon,
  scrub: ScrubIcon,
  face: FaceCareIcon,
  hair: HairIcon,
  lotion: LotionIcon,
  mist: MistIcon,
};

export function QuizRoutineSteps({
  selected,
  onToggle,
  boughtStepIds,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  boughtStepIds: string[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {routineSteps.map((step) => {
        const active = selected.includes(step.id);
        const bought = boughtStepIds.includes(step.id);
        const Icon = ICONS[step.icon];
        return (
          <button
            key={step.id}
            onClick={() => onToggle(step.id)}
            className={cn(
              "relative rounded-2xl border p-5 text-center transition",
              active ? "border-hella-green bg-hella-cream" : "border-black/15 bg-white hover:border-hella-green",
            )}
          >
            {/* necessary / must-have tag */}
            <span className="absolute left-4 top-3 text-[11px] font-medium">
              {step.necessary && <span className="text-hella-green">*</span>}
              {step.mustHave && <span className="text-black/40">must have</span>}
            </span>
            {/* tick */}
            <span
              className={cn(
                "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition",
                active ? "border-hella-green bg-hella-green text-white" : "border-black/25",
              )}
            >
              {active && <CheckIcon className="h-3 w-3" />}
            </span>

            <div className="mx-auto mt-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-[#f3efe8]">
              {bought ? (
                <div className="relative h-full w-full">
                  <Image src={step.productImage} alt={step.label} fill className="object-cover" sizes="96px" />
                </div>
              ) : (
                <Icon className="h-9 w-9 text-hella-green" />
              )}
            </div>

            <h3 className="mt-4 text-sm font-medium text-black">
              {step.label}
              {step.necessary && <span className="text-hella-green"> *</span>}
            </h3>
            <p className={cn("mt-0.5 text-xs", bought ? "text-hella-green" : "text-black/40")}>
              {bought ? "Đã mua tại Hella" : "Chưa mua"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
