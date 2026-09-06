import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  align?: "left" | "center";
  titleClassName?: string;
}

export function SectionHeading({
  subtitle,
  title,
  align = "left",
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left")}>
      <p className="font-heading text-sm italic tracking-wide text-black/80 sm:text-base">
        {subtitle}
      </p>
      <h2
        className={cn(
          "font-heading text-hella-green mt-2 leading-tight",
          titleClassName ?? "text-4xl sm:text-5xl",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
