import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { Reveal } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/Reveal";
import {
  ArrowRightIcon,
  CheckIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { NewsletterSignup } from "./NewsletterSignup";
import type { ArticleBlock, ArticleData } from "./articleTypes";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-heading text-hella-green mt-10 text-xl leading-snug">{block.text}</h2>
      );
    case "p":
      return <p className="mt-4 text-[15px] leading-relaxed text-black/75">{block.text}</p>;
    case "bullets":
      return (
        <ul className="mt-4 space-y-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-black/75">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hella-green" />
              <span>
                {it.lead && <strong className="font-semibold text-black">{it.lead} </strong>}
                {it.href ? (
                  <a href={it.href} target="_blank" rel="noreferrer" className="text-hella-green underline">
                    {it.text}
                  </a>
                ) : (
                  it.text
                )}
              </span>
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <div className="mt-6 rounded-2xl border border-black/10 bg-hella-cream/60 p-5">
          {block.title && <p className="font-heading text-hella-green">{block.title}</p>}
          <ul className="mt-3 space-y-2">
            {block.items.map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-black/75">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-hella-green text-white">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case "image":
      const imageAspect =
        block.aspect === "square"
          ? "aspect-square"
          : block.aspect === "portrait"
            ? "aspect-[54/71]"
            : block.aspect === "classic"
              ? "aspect-[4/3]"
              : block.aspect === "wide"
                ? "aspect-[2/1]"
              : "aspect-[16/10]";

      return (
        <figure className="mt-8">
          <div className={`relative w-full overflow-hidden rounded-lg bg-[#f3efe8] ${imageAspect}`}>
            <Image src={block.src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 760px" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs italic text-black/45">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "cta":
      return (
        <Link
          href={block.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {block.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      );
  }
}

export function ArticlePage({ data }: { data: ArticleData }) {
  return (
    <>
      <Header />

      <section className="relative h-[340px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]">
        <Image src={data.heroImage} alt="" fill priority className="object-cover object-center" sizes="100vw" />
      </section>

      <main className="flex-1">
        <article className="mx-auto max-w-[760px] px-5 py-12 lg:py-16">
          {data.heroCaption && (
            <p className="text-center text-xs italic text-black/45">{data.heroCaption}</p>
          )}
          <h1 className="font-heading text-hella-green mt-8 text-3xl leading-snug sm:text-4xl">
            {data.title}
          </h1>
          <p className="mt-4 border-b border-black/10 pb-6 text-xs text-black/50">
            Đăng bởi <span className="font-medium text-black/70">{data.author}</span> · {data.date}{" "}
            · {data.comments}
          </p>
          {data.intro && (
            <p className="mt-8 text-[15px] leading-relaxed text-black/75">{data.intro}</p>
          )}
          {data.blocks.map((block, i) => (
            <Reveal key={i}>
              <Block block={block} />
            </Reveal>
          ))}
        </article>

        {data.newsletter && <NewsletterSignup />}

        {data.related && data.related.length > 0 && (
          <section className="mx-auto max-w-[1000px] px-5 py-16 lg:py-20">
            <h2 className="font-heading text-center text-sm font-semibold uppercase tracking-widest text-black/60">
              Tiếp tục đọc
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {data.related.map((r) => (
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
        )}
      </main>

      <Footer />
    </>
  );
}
