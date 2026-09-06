"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount, type AccountUser } from "./AccountContext";

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
        className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black outline-none transition focus:border-hella-green"
      />
    </label>
  );
}

export function AccountForm({ onDone }: { onDone?: () => void }) {
  const { signup, login } = useAccount();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const submitSignup = () => {
    if (!name.trim() || !email.trim()) return setError("Vui lòng nhập họ tên và email.");
    if (!agree) return setError("Vui lòng đồng ý Điều khoản & Chính sách bảo mật.");
    if (pw !== pw2) return setError("Mật khẩu nhập lại không khớp.");
    setError("");
    const u: AccountUser = { name: name.trim(), email: email.trim(), phone: phone.trim(), avatarColor: color };
    signup(u);
    onDone?.();
  };
  const submitLogin = () => {
    if (!email.trim()) return setError("Vui lòng nhập email.");
    setError("");
    login(email.trim());
    onDone?.();
  };

  return (
    <div>
      <h1 className="font-heading text-center text-2xl text-hella-green">
        {mode === "signup" ? "Tạo tài khoản" : "Đăng nhập"}
      </h1>
      <p className="mt-2 text-center text-sm text-black/50">
        Tham gia Hella Beauty để lưu lại routine và nhận ưu đãi riêng cho bạn.
      </p>

      {mode === "signup" && (
        <div className="mt-6 flex flex-col items-center">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {(name.trim()[0] || "H").toUpperCase()}
          </span>
          <div className="mt-3 flex items-center gap-2">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c}
                aria-label={`Nền avatar ${c}`}
                onClick={() => setColor(c)}
                className={cn("h-5 w-5 rounded-full transition", color === c && "ring-2 ring-black/40 ring-offset-1")}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span className="mt-1.5 text-[11px] text-black/40">Chỉnh sửa nền avatar</span>
        </div>
      )}

      <div className="mt-6 space-y-3">
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
        <label className="mt-4 flex items-start gap-2 text-xs text-black/60">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-hella-green" />
          <span>
            Đồng ý <span className="text-hella-green underline">Điều khoản</span> &{" "}
            <span className="text-hella-green underline">Chính sách bảo mật</span>
          </span>
        </label>
      )}

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button
        onClick={mode === "signup" ? submitSignup : submitLogin}
        className="mt-5 w-full rounded-full bg-hella-green py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        {mode === "signup" ? "Tạo tài khoản" : "Đăng nhập"}
      </button>

      <p className="mt-4 text-center text-sm text-black/60">
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
  );
}
