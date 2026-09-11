import { expect, it } from "vitest";
import { createConversation, addMessage, parseHistory, chooseComboOption } from "./sisHistory";

it("keeps separate conversations and restores messages and the active questionnaire", () => {
  const first = addMessage(createConversation("body lotion"), "bodymist");
  const second = chooseComboOption(createConversation("combo"), "thanh-lich");
  const restored = parseHistory(JSON.stringify([first, second]));
  expect(restored).toEqual([first, second]);
  expect(first.messages).toHaveLength(4);
  expect(second.messages).toHaveLength(4);
  expect(second.combo?.step).toBe(1);
  expect(second.combo?.answers.vibe).toBe("thanh-lich");
  expect(first.id).not.toBe(second.id);
  expect(addMessage(first, "  ")).toEqual(first);
});

it("recovers from corrupt history without crashing the page", () => {
  expect(parseHistory("broken json")).toEqual([]);
  expect(parseHistory('{"messages":[]}')).toEqual([]);
  expect(parseHistory('[{"id":"bad","messages":[null]}]')).toEqual([]);
});
