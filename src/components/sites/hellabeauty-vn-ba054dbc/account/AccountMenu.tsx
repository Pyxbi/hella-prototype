"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount, type AccountUser } from "./AccountContext";
import {
  CloseIcon,
  UserIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const AVATAR_COLORS = ["#698269", "#c98a8a", "#d8b26e", "#7a8fb8", "#b088a8"];

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-black/70">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-hella-green"
      />
    </label>
  );
}

export function AccountMenu() {
  const { user, signup, login, logout } = useAccount();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const ref = useRef<HTMLDivElement>(null);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const initial = user?.name?.trim()?.[0]?.toUpperCase() ?? "?";

  const submitSignup = () => {
    if (!name.trim() || !email.trim()) return setError("Vui lòng nhập họ tên và email.");
    if (!agree) return setError("Vui lòng đồng ý Điều khoản & Chính sách bảo mật.");
    if (pw !== pw2) return setError("Mật khẩu nhập lại không khớp.");
    setError("");
    const u: AccountUser = { name: name.trim(), email: email.trim(), phone: phone.trim(), avatarColor: color };
    signup(u);
    setOpen(false);
  };
  const submitLogin = () => {
    if (!email.trim()) return setError("Vui lòng nhập email.");
    setError("");
    login(email.trim());
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Tài khoản"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center"
      >
        {user ? (
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: user.avatarColor }}
          >
            {initial}
          </span>
        ) : (
          <UserIcon className="h-5 w-5 text-black" />
        )}
      </button>

      {open && (
        <div className="hella-slide-up absolute right-0 top-full z-50 mt-3 w-[320px] rounded-2xl border border-black/10 bg-white p-5 shadow-xl">
          <button
            aria-label="Đóng"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-black/40 transition hover:text-black"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          {user ? (
            <div>
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
                <button className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green">
                  Tài khoản của tôi
                </button>
                <Link
                  href="/pages/hella-buddy"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
                >
                  Lịch nhắc nhở của tôi
                </Link>
                <button
                  onClick={logout}
                  className="block w-full rounded-md px-2 py-2 text-left text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-heading text-center text-xl text-hella-green">
                {mode === "signup" ? "Tạo tài khoản" : "Đăng nhập"}
              </h3>
              <p className="mt-1 text-center text-xs text-black/50">
                Tham gia Hella Beauty để lưu lại routine và nhận ưu đãi riêng cho bạn.
              </p>

              {mode === "signup" && (
                <div className="mt-4 flex flex-col items-center">
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {(name.trim()[0] || "H").toUpperCase()}
                  </span>
                  <div className="mt-2 flex items-center gap-1.5">
                    {AVATAR_COLORS.map((c) => (
                      <button
                        key={c}
                        aria-label={`Nền avatar ${c}`}
                        onClick={() => setColor(c)}
                        className={cn(
                          "h-4 w-4 rounded-full ring-offset-1 transition",
                          color === c && "ring-2 ring-black/40",
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="mt-1 text-[11px] text-black/40">Chỉnh sửa nền avatar</span>
                </div>
              )}

              <div className="mt-4 space-y-3">
                {mode === "signup" && (
                  <Field label="Họ và tên" placeholder="Nhập họ và tên của bạn" value={name} onChange={(e) => setName(e.target.value)} />
                )}
                <Field label="Email" type="email" placeholder="Nhập email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                {mode === "signup" && (
                  <Field label="Số điện thoại" placeholder="Nhập số điện thoại của bạn" value={phone} onChange={(e) => setPhone(e.target.value)} />
                )}
                <Field label="Mật khẩu" type="password" placeholder="Nhập mật khẩu của bạn" value={pw} onChange={(e) => setPw(e.target.value)} />
                {mode === "signup" && (
                  <Field label="Nhập lại mật khẩu" type="password" placeholder="Nhập lại mật khẩu" value={pw2} onChange={(e) => setPw2(e.target.value)} />
                )}
              </div>

              {mode === "signup" && (
                <label className="mt-3 flex items-start gap-2 text-[11px] text-black/60">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-hella-green" />
                  <span>
                    Đồng ý <span className="text-hella-green underline">Điều khoản</span> &{" "}
                    <span className="text-hella-green underline">Chính sách bảo mật</span>
                  </span>
                </label>
              )}

              {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

              <button
                onClick={mode === "signup" ? submitSignup : submitLogin}
                className="mt-4 w-full rounded-full bg-hella-green py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                {mode === "signup" ? "Tạo tài khoản" : "Đăng nhập"}
              </button>

              <p className="mt-3 text-center text-xs text-black/60">
                {mode === "signup" ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
                <button
                  onClick={() => {
                    setMode(mode === "signup" ? "login" : "signup");
                    setError("");
                  }}
                  className="text-hella-green underline"
                >
                  {mode === "signup" ? "Đăng nhập" : "Đăng ký"}
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
