"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "./AccountContext";
import {
  CloseIcon,
  UserIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function AccountMenu() {
  const { user, logout } = useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Logged out → avatar links to the dedicated account page.
  if (!user) {
    return (
      <Link href="/pages/tai-khoan" aria-label="Đăng nhập / Tạo tài khoản" className="flex items-center">
        <UserIcon className="h-5 w-5 text-black" />
      </Link>
    );
  }

  const initial = user.name.trim()[0]?.toUpperCase() ?? "?";

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Tài khoản"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center"
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: user.avatarColor }}
        >
          {initial}
        </span>
      </button>

      {open && (
        <div className="hella-slide-up absolute right-0 top-full z-50 mt-3 w-[280px] rounded-2xl border border-black/10 bg-white p-5 shadow-xl">
          <button
            aria-label="Đóng"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-black/40 transition hover:text-black"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{ backgroundColor: user.avatarColor }}
            >
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-base text-black">{user.name}</p>
              <p className="truncate text-xs text-black/50">{user.email}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1 border-t border-black/10 pt-3 text-sm">
            <Link
              href="/pages/hella-buddy"
              onClick={() => setOpen(false)}
              className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
            >
              Lịch nhắc nhở của tôi
            </Link>
            <Link
              href="/checkin"
              onClick={() => setOpen(false)}
              className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
            >
              Check-in hôm nay
            </Link>
            <Link
              href="/pages/loyalty"
              onClick={() => setOpen(false)}
              className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
            >
              Sao thưởng của tôi
            </Link>
            <button className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green">
              Tài khoản của tôi
            </button>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
