import { describe, expect, it, vi } from "vitest";
import { fetchRandomContact, toContact } from "./randomUser";

function mockFetch(body, init) {
  return vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(body), init));
}

const apiUser = {
  name: { title: "Mr", first: "Baltasar", last: "Freitas" },
  email: "baltasar.freitas@example.com",
  phone: "(21) 8287-4873",
};

describe("toContact", () => {
  it("maps an API user to a contact", () => {
    expect(toContact(apiUser)).toEqual({
      name: "Baltasar Freitas",
      email: "baltasar.freitas@example.com",
      phone: "(21) 8287-4873",
    });
  });
});

describe("fetchRandomContact", () => {
  it("returns the first result as a contact", async () => {
    mockFetch({ results: [apiUser] });
    await expect(fetchRandomContact()).resolves.toEqual(toContact(apiUser));
  });

  it("throws on HTTP error statuses", async () => {
    mockFetch({ error: "Unavailable" }, { status: 503 });
    await expect(fetchRandomContact()).rejects.toThrow("Status: 503");
  });

  it("throws when the API returns no results", async () => {
    mockFetch({ results: [] });
    await expect(fetchRandomContact()).rejects.toThrow("no results");
  });
});
