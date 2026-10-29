import { describe, expect, it } from "vitest";
import {
  isDuplicateContact,
  normalizeContact,
  validateContact,
} from "./validateContact";

const valid = { name: "Tony Stark", email: "ts@av.com", phone: "111-222-3333" };

describe("validateContact", () => {
  it("accepts a valid contact", () => {
    expect(validateContact(valid)).toBeNull();
  });

  it("accepts international phone formats", () => {
    expect(validateContact({ ...valid, phone: "(21) 8287-4873" })).toBeNull();
  });

  it.each([
    [{ ...valid, name: "" }, "Name is required."],
    [{ ...valid, email: "not-an-email" }, "Enter a valid email address."],
    [{ ...valid, phone: "abc" }, "Enter a valid phone number."],
  ])("rejects %o", (contact, message) => {
    expect(validateContact(contact)).toBe(message);
  });
});

describe("normalizeContact", () => {
  it("trims whitespace", () => {
    expect(
      normalizeContact({ name: " Tony ", email: " a@b.co ", phone: " 1234567 " }),
    ).toEqual({ name: "Tony", email: "a@b.co", phone: "1234567" });
  });
});

describe("isDuplicateContact", () => {
  const contacts = [{ id: "1", ...valid }];

  it("matches same name (any case) and phone", () => {
    expect(
      isDuplicateContact(contacts, { ...valid, name: "tony stark" }),
    ).toBe(true);
  });

  it("ignores the contact being updated", () => {
    expect(isDuplicateContact(contacts, { id: "1", ...valid })).toBe(false);
  });
});
