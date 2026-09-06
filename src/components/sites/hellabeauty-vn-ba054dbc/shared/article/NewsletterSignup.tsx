"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-[#f6f1e7] py-14 lg:py-16">
      <div className="mx-auto max-w-[640px] px-5 text-center">
        <h2 className="font-heading text-hella-green text-2xl leading-tight sm:text-3xl">
          Đăng ký để nhận thông tin khuyến mãi sớm nhất từ Hella Beauty
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-black/60">
          Đăng ký để nhận thông tin về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề
          đáng quan tâm của Hella Beauty.
        </p>
        {done ? (
          <p className="mt-6 font-heading text-hella-green">Cảm ơn bạn đã đăng ký! ✦</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
            className="mx-auto mt-6 flex max-w-md gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none transition focus:border-hella-green"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-hella-green px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Đăng ký
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
