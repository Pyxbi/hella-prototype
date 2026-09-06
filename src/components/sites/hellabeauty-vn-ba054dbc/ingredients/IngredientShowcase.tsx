import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { ingredientHero } from "./ingredientsData";

export function IngredientShowcase() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
      {/* Text first on desktop, image second */}
      <div className="order-2 max-w-xl lg:order-1">
        <p className="font-heading text-sm italic text-black/70 sm:text-base">
          Nguyên liệu Hella Beauty
        </p>
        <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
          Minh bạch từ thiên nhiên
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-black/70 sm:text-base">
          Từ vỏ cam, cà phê, đậu đỏ đến hạnh nhân, macca — mỗi nguyên liệu đều
          được tuyển chọn kỹ lưỡng, minh bạch từ nguồn gốc đến công thức để nâng
          niu làn da của bạn.
        </p>
        <Link
          href="/pages/nguyen-lieu"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Khám phá ngay
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative order-1 aspect-[4/3] w-full overflow-hidden lg:order-2">
        <Image
          src={ingredientHero}
          alt="Nguyên liệu thiên nhiên Hella Beauty"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
