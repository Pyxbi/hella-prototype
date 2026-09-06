import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { factoryImages } from "./factoryData";

export function FactoryShowcase() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={factoryImages.exterior}
          alt="Nhà máy Hella Beauty"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="max-w-xl">
        <p className="font-heading text-sm italic text-black/70 sm:text-base">
          Nhà máy Hella Beauty
        </p>
        <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
          Sản xuất đạt chuẩn quốc tế
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-black/70 sm:text-base">
          Nhà máy 19.890 m² vận hành theo tiêu chuẩn ISO 22716:2007 (CGMP) và ISO
          9001:2015 (QMS) — minh bạch từ nguyên liệu đến thành phẩm, cho bạn sự an
          tâm trọn vẹn.
        </p>
        <Link
          href="/pages/nha-may"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Khám phá ngay thông tin nhà máy
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
