import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import {
  factoryCerts,
  factoryImages,
  factoryIntro,
  factoryStats,
} from "./factoryData";

export function FactoryPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]">
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
        {/* Intro */}
        <section className="mx-auto max-w-[1000px] px-5 py-16 text-center lg:py-20">
          <p className="font-heading text-sm italic text-black/70 sm:text-base">
            {factoryIntro.eyebrow}
          </p>
          <h1 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-5xl">
            {factoryIntro.title}
          </h1>
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            {factoryIntro.body.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-black/70 sm:text-base">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#f6f1e7] py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-10">
            {factoryStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-hella-green text-4xl leading-none sm:text-5xl">
                  {s.value}
                </p>
                <p className="mx-auto mt-3 max-w-[160px] text-xs text-black/60 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <p className="font-heading text-sm italic text-black/70 sm:text-base">
              Cam kết chất lượng
            </p>
            <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
              Đạt chuẩn các chứng nhận quốc tế
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {factoryCerts.map((c) => (
              <div key={c.code} className="group">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f3efe8]">
                  <Image
                    src={c.image}
                    alt={`${c.code} — ${c.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-heading text-hella-green mt-5 text-2xl">{c.code}</h3>
                <p className="mt-1 text-sm text-black/70">{c.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden">
          <div className="relative h-[280px] w-full sm:h-[340px]">
            <Image
              src={factoryImages.stats}
              alt="Khu vực sản xuất Hella Beauty"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-5 text-center">
              <h2 className="font-heading max-w-2xl text-2xl leading-tight text-white sm:text-4xl">
                Trải nghiệm sản phẩm từ nhà máy đạt chuẩn của Hella Beauty
              </h2>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Khám phá sản phẩm
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
