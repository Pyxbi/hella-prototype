import Image from "next/image";
import { collectionBanner } from "./data";

export function CollectionBanner() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-20">
      <div className="order-1 max-w-xl">
        <p className="font-heading text-base italic text-black/80 sm:text-lg">
          {collectionBanner.subtitle}
        </p>
        <h2 className="font-heading text-hella-green mt-3 text-3xl leading-tight sm:text-4xl">
          {collectionBanner.title}
        </h2>
      </div>
      <div className="relative order-2">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={collectionBanner.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {/* Rotating sale badge overlay */}
        <div className="hella-spin absolute right-3 top-3 h-24 w-24 sm:right-6 sm:top-6 sm:h-32 sm:w-32">
          <Image
            src={collectionBanner.badge}
            alt=""
            fill
            className="object-contain"
            sizes="128px"
          />
        </div>
      </div>
    </section>
  );
}
