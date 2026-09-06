"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IMG, navLinks } from "./data";
import {
  CartIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { AccountMenu } from "@/components/sites/hellabeauty-vn-ba054dbc/account/AccountMenu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[77px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-3 lg:flex-1">
          <button
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link href="/" className="block">
            <Image
              src={`${IMG}/logo.png`}
              alt="Hella Beauty"
              width={110}
              height={26}
              className="h-auto w-[92px] sm:w-[110px]"
              priority
            />
          </Link>
        </div>

        {/* Center: nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="font-heading flex items-center gap-1 text-sm font-medium text-black transition-colors hover:text-hella-green"
              >
                {item.label}
                {item.children && <ChevronDownIcon className="h-3.5 w-3.5" />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-40 min-w-[220px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-md border border-black/5 bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block whitespace-nowrap px-5 py-2 text-sm text-black/80 transition-colors hover:text-hella-green"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: icons */}
        <div className="flex items-center justify-end gap-4 lg:flex-1">
          <button aria-label="Tìm kiếm">
            <SearchIcon className="h-5 w-5 text-black" />
          </button>
          <div className="hidden sm:block">
            <AccountMenu />
          </div>
          <button aria-label="Giỏ hàng" className="relative">
            <CartIcon className="h-5 w-5 text-black" />
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <ul className="px-5 py-3">
            {navLinks.map((item) => (
              <li key={item.label} className="py-1">
                <Link
                  href={item.href}
                  className="font-heading block py-2 text-sm font-medium text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block py-1.5 text-sm text-black/70"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
