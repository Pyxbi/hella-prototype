import { productTabHeading } from "./data";

export function ProductTabHeading() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
      <p className="font-heading text-sm italic text-black/80 sm:text-base">
        {productTabHeading.subtitle}
      </p>
      <h2 className="font-heading text-hella-green mt-2 text-2xl leading-tight sm:text-3xl">
        {productTabHeading.title}
      </h2>
    </section>
  );
}
