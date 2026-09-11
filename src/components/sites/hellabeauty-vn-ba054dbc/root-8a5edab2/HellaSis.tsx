"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HellaSisBar } from "./HellaSisBar";
import { ChatBubbleIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { filterSuggestions } from "./sisEngine";
import { createConversation, saveConversation } from "./sisHistory";

export function HellaSis() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(() => filterSuggestions(value), [value]);
  const submit = (text: string) => {
    if (!text.trim()) return;
    const chat = createConversation(text);
    saveConversation(chat);
    router.push(`/pages/hella-sis?chat=${chat.id}`);
  };

  return (
    <>
      <HellaSisBar value={value} onChange={setValue} onSubmit={submit} open={open}
        onOpenChange={setOpen} suggestions={suggestions} onPick={(qa) => submit(qa.question)} />
      <button aria-label="Trò chuyện với Hella Sis" onClick={() => router.push("/pages/hella-sis")}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hella-green text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hella-green">
        <ChatBubbleIcon className="h-7 w-7" />
      </button>
    </>
  );
}
