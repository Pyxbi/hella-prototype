"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { Reveal } from "./Reveal";
import {
  ingredientHero,
  ingredientIntro,
  ingredientStories,
  philosophy,
  productShowcase,
  trustBadges,
} from "./ingredientsData";

export function IngredientsPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]">
        <Image
          src={ingredientHero}
          alt="Nguyên liệu thiên nhiên Hella Beauty"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/25 px-5 text-center backdrop-blur-[1px]">
          <p className="font-heading text-sm italic text-black/80 sm:text-base">
            {ingredientIntro.eyebrow}
          </p>
          <h1 className="font-heading text-hella-green mt-2 text-4xl leading-tight sm:text-6xl">
            {ingredientIntro.title}
          </h1>
        </div>
      </section>

      <main className="flex-1">
        {/* Transparency intro */}
        <section className="mx-auto max-w-[1000px] px-5 py-16 text-center lg:py-20">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base">
            {philosophy}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-hella-green px-4 py-2 text-xs font-medium text-hella-green sm:text-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Ingredient stories */}
        <section className="mx-auto max-w-[1400px] px-5 pb-4 lg:px-10">
          <div className="text-center">
            <p className="font-heading text-sm italic text-black/70 sm:text-base">
              Câu chuyện nguyên liệu
            </p>
            <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
              Tinh tuý từ thiên nhiên
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ingredientStories.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 100}>
                <div className="group relative aspect-video w-full overflow-hidden bg-[#f3efe8]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Product & scent notes */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <p className="font-heading text-sm italic text-black/70 sm:text-base">
              Thành phần & tầng hương
            </p>
            <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
              Sản phẩm Hella Beauty
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productShowcase.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 100}>
                <div className="group relative aspect-square w-full overflow-hidden bg-[#f3efe8]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f6f1e7] py-16 text-center lg:py-20">
          <h2 className="font-heading text-hella-green mx-auto max-w-2xl px-5 text-2xl leading-tight sm:text-4xl">
            Chạm đến làn da khoẻ đẹp cùng nguyên liệu lành tính
          </h2>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Khám phá sản phẩm
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
