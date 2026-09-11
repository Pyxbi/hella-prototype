"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ArrowLeftIcon, ArrowRightIcon, ChatBubbleIcon, CheckIcon, MenuIcon, SearchIcon, SendIcon, SparkleIcon } from "../shared/icons";
import { IMG } from "./data";
import { comboSteps, filterSuggestions, type SisMessage } from "./sisEngine";
import { HellaSisComboWizard } from "./HellaSisComboWizard";
import { addMessage, chooseComboOption, createConversation, getHistorySnapshot, getServerHistorySnapshot, isHistoryTemporary, parseHistory, saveConversation, subscribeHistory, type SisConversation } from "./sisHistory";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hella-green";

function History({ chats, activeId, onSelect, onNew }: {
  chats: SisConversation[]; activeId?: string; onSelect: (id: string) => void; onNew: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = chats.filter((chat) => chat.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  return (
    <div className="flex h-full min-h-0 flex-col bg-hella-cream px-5 py-7">
      <Link href="/" aria-label="Hella Beauty – Trang chủ" className={`w-fit ${focus}`}>
        <Image src={`${IMG}/logo.png`} alt="Hella Beauty" width={96} height={48} className="h-auto w-24" />
      </Link>
      <div className="mt-10 flex items-center gap-2 text-hella-green"><SparkleIcon className="h-4 w-4" /><span className="font-heading text-xl">Hella Sis</span></div>
      <Button onClick={onNew} className="mt-5 h-11 w-full justify-between rounded-none bg-hella-green px-4 text-white hover:bg-hella-green/90 focus-visible:ring-hella-green/30">
        Cuộc trò chuyện mới <span aria-hidden="true" className="text-xl font-light">+</span>
      </Button>
      <label className="mt-6 flex items-center gap-2 border-b border-black/15 pb-3 text-black/50 focus-within:border-hella-green">
        <SearchIcon className="h-4 w-4 shrink-0" />
        <input aria-label="Tìm cuộc trò chuyện" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm cuộc trò chuyện" className="min-w-0 flex-1 bg-transparent text-xs text-black outline-none placeholder:text-black/50" />
      </label>
      <p className="mb-3 mt-7 text-xs text-black/55">Cuộc trò chuyện của bạn</p>
      <nav aria-label="Lịch sử trò chuyện" className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {filtered.length ? filtered.map((chat) => (
          <button key={chat.id} onClick={() => onSelect(chat.id)} aria-current={chat.id === activeId ? "page" : undefined}
            className={`group flex w-full items-start gap-3 border-l-2 px-3 py-3 text-left transition-colors ${focus} ${chat.id === activeId ? "border-hella-green bg-white text-hella-green" : "border-transparent text-black/75 hover:bg-white/60"}`}>
            <ChatBubbleIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0"><span className="block truncate text-[13px] leading-5">{chat.title}</span><span className="mt-1 block text-[10px] text-black/45">{new Date(chat.updatedAt).toLocaleDateString("vi-VN", { day: "numeric", month: "long" })}</span></span>
          </button>
        )) : <p className="px-1 text-xs leading-6 text-black/50">{search ? "Chưa tìm thấy cuộc trò chuyện phù hợp." : "Những câu chuyện làm đẹp của bạn sẽ được lưu tại đây."}</p>}
      </nav>
      <div className="mt-5 border-t border-black/10 pt-5">
        <p className="font-heading text-lg text-hella-green">Một chút chăm sóc, mỗi ngày.</p>
        <Link href="/" className={`mt-4 inline-flex items-center gap-2 text-xs text-black/60 transition hover:text-hella-green ${focus}`}><ArrowLeftIcon className="h-3.5 w-3.5" /> Trở về Hella Beauty</Link>
      </div>
    </div>
  );
}

function Answer({ message }: { message: Extract<SisMessage, { role: "sis" }> }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(message.answer.text.join("\n\n")); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  };
  return (
    <article className="flex gap-3 sm:gap-5">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hella-green/25 text-hella-green"><SparkleIcon className="h-4 w-4" /></div>
      <div className="min-w-0 flex-1">
        <p className="mb-3 font-heading text-lg text-hella-green">Hella Sis</p>
        <div className="space-y-3 text-sm leading-7 text-black/80 sm:text-[15px]">
          {message.answer.text.map((text, i) => <p key={i} className="whitespace-pre-line">{text}</p>)}
        </div>
        {!!message.answer.products?.length && <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {message.answer.products.map((product) => <Link key={product.title} href={product.href} className={`group flex items-center gap-3 border border-black/10 bg-white p-3 transition hover:border-hella-green ${focus}`}>
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#f3efe8]"><Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
            <div><p className="text-xs leading-5 text-black/80">{product.title}</p><span className="mt-2 inline-flex items-center gap-1 text-[11px] text-hella-green">Khám phá <ArrowRightIcon className="h-3 w-3" /></span></div>
          </Link>)}
        </div>}
        {!!message.answer.links?.filter((link) => link.url !== "#").length && <div className="mt-4 flex flex-wrap gap-4">
          {message.answer.links.filter((link) => link.url !== "#").map((link) => <Link key={link.label} href={link.url} className={`text-xs text-hella-green underline underline-offset-4 ${focus}`}>{link.label}</Link>)}
        </div>}
        <button onClick={copy} aria-label="Sao chép câu trả lời" className={`mt-4 inline-flex items-center gap-1.5 text-[11px] text-black/45 transition hover:text-hella-green ${focus}`}>
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <span aria-hidden="true">⧉</span>}{copied ? "Đã sao chép" : "Sao chép"}
        </button>
        {copyError && <p role="status" className="mt-1 text-xs text-black/60">Bạn có thể chọn nội dung phía trên để sao chép.</p>}
      </div>
    </article>
  );
}

function Conversation({ chat, onSave }: { chat?: SisConversation; onSave: (chat: SisConversation) => void }) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const suggestions = filterSuggestions("");
  useEffect(() => {
    if (chat?.messages.length) endRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, [chat?.messages.length, chat?.combo?.step]);
  const send = (text: string) => {
    if (!text.trim()) return;
    onSave(chat ? addMessage(chat, text) : createConversation(text));
    setDraft("");
    composerRef.current?.focus();
  };

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto flex min-h-full max-w-[840px] flex-col px-5 pb-4 pt-6 sm:px-10 sm:pt-6">
          {!chat ? <div className="flex flex-1 flex-col justify-center">
            <h1 className="font-heading max-w-[640px] text-3xl leading-[1.18] text-hella-green sm:text-[40px]">Hôm nay, mình chăm sóc bạn thế nào?</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/60">Từ một mùi hương hợp gu đến routine dành riêng cho làn da. Hella Sis ở đây, cùng bạn tìm điều phù hợp.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {suggestions.slice(0, 4).map((qa) => <button key={qa.id} onClick={() => send(qa.question)} className={`flex min-h-16 items-center justify-between gap-4 border border-black/10 p-3 text-left text-sm leading-6 transition hover:border-hella-green hover:bg-hella-cream ${focus}`}>{qa.question}<ArrowRightIcon className="h-4 w-4 shrink-0 text-hella-green" /></button>)}
            </div>
          </div> : <div role="log" aria-label="Nội dung trò chuyện" aria-live="polite" className="space-y-9">
            {chat.messages.map((message) => message.role === "user" ? <div key={message.id} className="flex justify-end"><p className="max-w-[85%] whitespace-pre-wrap break-words bg-hella-cream px-5 py-3.5 text-sm leading-6 text-black/85">{message.text}</p></div> : <Answer key={message.id} message={message} />)}
            {chat.combo && <div className="border border-hella-green/20 bg-hella-cream p-5 sm:ml-14">
              <p className="mb-3 text-xs text-hella-green">Cùng tìm routine của bạn · {chat.combo.step + 1}/3</p>
              <HellaSisComboWizard step={comboSteps[chat.combo.step]} selected={chat.combo.selected} onSelect={(id) => onSave(chooseComboOption(chat, id))} onNext={() => onSave(chooseComboOption(chat))} />
            </div>}
          </div>}
          <div ref={endRef} />
        </div>
      </div>
      <div className="shrink-0 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-10 sm:pb-6">
        <div className="mx-auto max-w-[760px]">
          {chat && !chat.combo && <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {suggestions.slice(0, 3).map((qa) => <button key={qa.id} onClick={() => send(qa.question)} className={`shrink-0 rounded-full border border-black/10 px-3 py-2 text-[11px] text-black/60 transition hover:border-hella-green hover:text-hella-green ${focus}`}>{qa.question}</button>)}
          </div>}
          <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="border border-hella-green/35 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] focus-within:border-hella-green">
            <textarea ref={composerRef} aria-label="Nhắn tin cho Hella Sis" value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} maxLength={4000}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(draft); } }}
              placeholder={chat?.combo ? "Chọn gợi ý phía trên hoặc hỏi Sis điều khác…" : "Kể Sis nghe điều bạn đang quan tâm…"}
              className="block max-h-40 min-h-12 w-full resize-none bg-transparent text-base leading-6 text-black outline-none placeholder:text-black/45 sm:text-sm" />
            <div className="mt-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-hella-green"><SparkleIcon className="h-3.5 w-3.5" /> Hella Sis</span>
              <Button type="submit" disabled={!draft.trim()} aria-label="Gửi tin nhắn" className="h-9 w-9 rounded-full bg-hella-green p-0 text-white hover:bg-hella-green/90 focus-visible:ring-hella-green/30"><SendIcon className="h-4 w-4" /></Button>
            </div>
          </form>
          <p className="mt-3 text-center text-[10px] leading-4 text-black/45">Hella Sis phiên bản trải nghiệm · Gợi ý tham khảo dành cho hành trình làm đẹp của bạn.</p>
        </div>
      </div>
    </>
  );
}

export function HellaSisPage() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = useSyncExternalStore(subscribeHistory, getHistorySnapshot, getServerHistorySnapshot);
  const chats = useMemo(() => parseHistory(raw), [raw]);
  const requestedId = params.get("chat");
  const active = requestedId ? chats.find((chat) => chat.id === requestedId) : chats[0];
  const [mobileOpen, setMobileOpen] = useState(false);
  const select = (id: string) => { router.push(`/pages/hella-sis?chat=${id}`, { scroll: false }); setMobileOpen(false); };
  const save = (chat: SisConversation) => { saveConversation(chat); if (chat.id !== active?.id) router.replace(`/pages/hella-sis?chat=${chat.id}`, { scroll: false }); };
  const historyProps = { chats, activeId: active?.id, onSelect: select, onNew: () => select("new") };

  return (
    <main className="flex h-dvh min-h-0 overflow-hidden bg-white text-black">
      <aside className="hidden w-[272px] shrink-0 border-r border-black/5 lg:block"><History {...historyProps} /></aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[290px] gap-0 border-black/10 bg-hella-cream p-0" showCloseButton>
          <SheetTitle className="sr-only">Lịch sử Hella Sis</SheetTitle><SheetDescription className="sr-only">Mở lại một cuộc trò chuyện hoặc bắt đầu câu chuyện mới.</SheetDescription>
          <History {...historyProps} />
        </SheetContent>
      </Sheet>
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[77px] shrink-0 items-center justify-between gap-3 border-b border-black/5 px-5 sm:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Mở lịch sử trò chuyện" onClick={() => setMobileOpen(true)} className="rounded-none text-hella-green hover:bg-hella-cream lg:hidden"><MenuIcon className="h-5 w-5" /></Button>
            <div className="min-w-0"><p className="font-heading text-2xl text-hella-green">Hella Sis</p><p className="truncate text-[11px] text-black/50">Trợ lý làm đẹp dành riêng cho bạn</p></div>
          </div>
          <Link href="/" aria-label="Khám phá Hella" className={`flex shrink-0 items-center gap-2 text-xs text-black/60 hover:text-hella-green ${focus}`}><span className="hidden sm:inline">Khám phá Hella</span><ArrowRightIcon className="h-4 w-4" /></Link>
        </header>
        {isHistoryTemporary() && <p role="status" className="bg-hella-cream px-5 py-2 text-xs">Trình duyệt chưa thể lưu lịch sử. Hãy giữ trang này mở để tiếp tục cuộc trò chuyện.</p>}
        <Conversation key={active?.id ?? "new"} chat={active} onSave={save} />
      </section>
    </main>
  );
}
