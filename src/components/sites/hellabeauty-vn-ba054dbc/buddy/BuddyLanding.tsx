import Image from "next/image";
import { featureTiles } from "./buddyData";
import {
  ArrowRightIcon,
  ChatBubbleIcon,
  CheckIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const HERO = "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/collection_banner.png";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}
const tileIcons = [<SparkleIcon key="s" className="h-5 w-5" />, <BellIcon key="b" />, <ChatBubbleIcon key="c" className="h-5 w-5" />, <CheckIcon key="k" className="h-5 w-5" />];

export function BuddyLanding({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex-1">
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-20">
        <div className="max-w-xl">
          <p className="font-heading text-sm italic text-black/70 sm:text-base">Hella Buddy</p>
          <h1 className="font-heading mt-2 text-4xl leading-tight text-black sm:text-5xl">
            Để Hella Sis đồng hành, giúp bạn duy trì{" "}
            <span className="text-hella-green">routine đều đặn</span>.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-black/70 sm:text-base">
            Hành trình chăm sóc cơ thể của bạn không dừng lại sau khi mua hàng. Nhận lịch nhắc
            nhở cá nhân hoá, theo dõi và đồng hành cùng Hella Sis trong suốt routine của bạn.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-hella-green px-7 py-3.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Thiết lập lịch nhắc nhở của tôi
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={HERO} alt="Hella Beauty products" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10 lg:pb-24">
        {featureTiles.map((t, i) => (
          <div key={t.title} className="border border-black/10 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hella-cream text-hella-green">
              {tileIcons[i]}
            </span>
            <h3 className="font-heading mt-4 text-lg text-black">{t.title}</h3>
            <p className="mt-1 text-sm text-black/60">{t.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
