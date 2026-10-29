import { describe, expect, it } from "vitest";
import { contactsReducer } from "./contactsReducer";

const tony = {
  id: "1",
  name: "Tony Stark",
  email: "ts@av.com",
  phone: "111-222-3333",
  isFavorite: false,
};

describe("contactsReducer", () => {
  it("adds a contact", () => {
    expect(contactsReducer([], { type: "add", contact: tony })).toEqual([tony]);
  });

  it("merges updates without touching fields that were not sent", () => {
    const state = [{ ...tony, isFavorite: true }];
    const result = contactsReducer(state, {
      type: "update",
      contact: { id: "1", name: "Iron Man" },
    });
    expect(result[0]).toEqual({ ...tony, name: "Iron Man", isFavorite: true });
  });

  it("removes a contact by id", () => {
    expect(contactsReducer([tony], { type: "remove", id: "1" })).toEqual([]);
  });

  it("toggles favorite", () => {
    const result = contactsReducer([tony], { type: "toggleFavorite", id: "1" });
    expect(result[0].isFavorite).toBe(true);
  });

  it("clears all contacts", () => {
    expect(contactsReducer([tony], { type: "clear" })).toEqual([]);
  });

  it("does not mutate the previous state", () => {
    const state = [tony];
    contactsReducer(state, { type: "toggleFavorite", id: "1" });
    expect(state[0].isFavorite).toBe(false);
  });

  it("throws on unknown actions", () => {
    expect(() => contactsReducer([], { type: "nope" })).toThrow(
      "Unknown action: nope",
    );
  });
});
