import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { Reveal } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/Reveal";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import {
  factoryArticle as A,
  factoryImages,
  factoryStats,
  relatedArticles,
} from "./factoryData";

export function FactoryPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[340px] w-full overflow-hidden sm:h-[460px] lg:h-[560px]">
        <Image
          src={factoryImages.exterior}
          alt="Nhà máy Hella Beauty"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>

      <main className="flex-1">
        <article className="mx-auto max-w-[760px] px-5 py-12 lg:py-16">
          <p className="text-center text-xs italic text-black/45">{A.heroCaption}</p>

          <h1 className="font-heading text-hella-green mt-8 text-3xl leading-snug sm:text-4xl">
            {A.title}
          </h1>
          <p className="mt-4 border-b border-black/10 pb-6 text-xs text-black/50">
            Đăng bởi <span className="font-medium text-black/70">{A.author}</span> · {A.date} ·{" "}
            {A.comments}
          </p>

          <p className="mt-8 text-[15px] leading-relaxed text-black/75">{A.intro}</p>

          <Reveal>
            <h2 className="font-heading text-hella-green mt-10 text-xl leading-snug">
              {A.journey.heading}
            </h2>
            {A.journey.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-[15px] leading-relaxed text-black/75">
                {p}
              </p>
            ))}
          </Reveal>

          {/* Inline image */}
          <Reveal className="mt-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#f3efe8]">
              <Image
                src={factoryImages.iso9001}
                alt="Đội ngũ vận hành nhà máy Hella Beauty"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 760px"
              />
            </div>
            <p className="mt-3 text-center text-xs italic text-black/45">{A.iso9001Caption}</p>
          </Reveal>
        </article>

        {/* Stats strip */}
        <section className="bg-[#f6f1e7] py-12">
          <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-6 px-5 lg:grid-cols-4">
            {factoryStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-hella-green text-3xl leading-none sm:text-4xl">
                  {s.value}
                </p>
                <p className="mx-auto mt-2 max-w-[150px] text-xs text-black/60">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <article className="mx-auto max-w-[760px] px-5 py-12 lg:py-16">
          {/* Certifications */}
          <Reveal>
            <h2 className="font-heading text-hella-green text-xl leading-snug">
              {A.certsSection.heading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-black/75">
              {A.certsSection.intro}
            </p>
            <div className="mt-6 space-y-4">
              {A.certsSection.items.map((c) => (
                <div key={c.code} className="rounded-2xl border border-black/10 bg-white p-5">
                  <p className="font-heading text-hella-green text-lg">{c.code}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-black/50">
                    {c.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* TO GET HER */}
          <Reveal>
            <h2 className="font-heading text-hella-green mt-12 text-xl leading-snug">
              {A.toGetHer.heading}
            </h2>
            {A.toGetHer.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-[15px] leading-relaxed text-black/75">
                {p}
              </p>
            ))}
            <Link
              href={A.toGetHer.ctaHref}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {A.toGetHer.ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </article>

        {/* Related reads */}
        <section className="mx-auto max-w-[1000px] px-5 pb-16 lg:pb-24">
          <h2 className="font-heading text-center text-sm font-semibold uppercase tracking-widest text-black/60">
            Tiếp tục đọc
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {relatedArticles.map((r) => (
              <Link key={r.title} href={r.href} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#f3efe8]">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                  <span className="absolute bottom-3 left-3 right-3 font-heading text-lg leading-tight text-white drop-shadow">
                    {r.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-black transition-colors group-hover:text-hella-green">
                  {r.title}
                </h3>
                <p className="mt-1 text-xs leading-snug text-black/60">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
