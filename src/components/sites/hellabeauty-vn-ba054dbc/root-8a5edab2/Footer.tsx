import Image from "next/image";
import Link from "next/link";
import { footer } from "./data";

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Curved cream transition band */}
      <div className="relative h-[90px] w-full overflow-hidden sm:h-[150px]">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path d="M0,70 Q720,-30 1440,70 L1440,200 L0,200 Z" fill="#f6f1e7" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-10 lg:px-10">
        {/* Logo */}
        <div className="flex justify-center pb-10">
          <Image
            src={footer.logo}
            alt="Hella Beauty"
            width={150}
            height={35}
            className="h-auto w-[130px]"
          />
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Company info */}
          <div>
            <h3 className="font-heading text-2xl leading-snug text-black">
              {footer.company.name}
            </h3>
            <p className="mt-5 text-sm text-black/80">{footer.company.reg}</p>
            <p className="mt-4 text-sm text-black/80">
              Email: {footer.company.email}
            </p>
            <p className="mt-4 text-sm text-black/80">
              Số điện thoại: {footer.company.phone}
            </p>
            <Image
              src={footer.company.bct}
              alt="Đã thông báo Bộ Công Thương"
              width={200}
              height={76}
              className="mt-6 h-auto w-[200px]"
            />
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-2xl text-black">{col.title}</h3>
              <ul className="mt-6 space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/80 transition-colors hover:text-hella-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="mt-14 flex items-start justify-center gap-16">
          {footer.socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex flex-col items-center gap-2"
            >
              <Image src={s.icon} alt={s.label} width={30} height={30} />
              <span className="text-sm font-semibold text-black">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:flex-row sm:text-left lg:px-10">
          <p className="text-xs text-black/70 sm:text-sm">{footer.bottomLine}</p>
          <div className="flex shrink-0 items-center gap-3">
            {footer.markets.map((m) => (
              <Image
                key={m.label}
                src={m.icon}
                alt={m.label}
                width={28}
                height={28}
                className="h-6 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
