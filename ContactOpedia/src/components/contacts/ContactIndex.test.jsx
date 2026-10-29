import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ContactIndex from "./ContactIndex";
import { fetchRandomContact } from "../../api/randomUser";
import { STORAGE_KEY } from "../../hooks/useContacts";

vi.mock("../../api/randomUser", () => ({ fetchRandomContact: vi.fn() }));

const favorites = () => screen.getByRole("region", { name: "Favorites" });
const general = () => screen.getByRole("region", { name: "General" });

async function fillForm(user, { name, email, phone }) {
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email");
  const phoneInput = screen.getByLabelText("Phone");
  await user.clear(nameInput);
  await user.type(nameInput, name);
  await user.clear(emailInput);
  await user.type(emailInput, email);
  await user.clear(phoneInput);
  await user.type(phoneInput, phone);
}

describe("ContactIndex", () => {
  it("shows the seed contacts split into favorites and general", () => {
    render(<ContactIndex />);
    expect(within(general()).getByText("Tony Stark")).toBeInTheDocument();
    expect(within(favorites()).getByText("Peter Parker")).toBeInTheDocument();
  });

  it("adds a contact and resets the form", async () => {
    const user = userEvent.setup();
    render(<ContactIndex />);

    await fillForm(user, {
      name: "Bruce Banner",
      email: "hulk@av.com",
      phone: "111-222-3336",
    });
    await user.click(screen.getByRole("button", { name: "Create Contact" }));

    expect(within(general()).getByText("Bruce Banner")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Contact was added.");
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });

  it("rejects duplicates", async () => {
    const user = userEvent.setup();
    render(<ContactIndex />);

    await fillForm(user, {
      name: "Tony Stark",
      email: "other@av.com",
      phone: "111-222-3333",
    });
    await user.click(screen.getByRole("button", { name: "Create Contact" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Duplicate record.");
  });

  it("moves a contact between lists when favorited", async () => {
    const user = userEvent.setup();
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Favorite Tony Stark" }));

    expect(within(favorites()).getByText("Tony Stark")).toBeInTheDocument();
  });

  it("keeps a favorite toggled while the edit form is open", async () => {
    const user = userEvent.setup();
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Edit Tony Stark" }));
    await user.click(screen.getByRole("button", { name: "Favorite Tony Stark" }));
    await fillForm(user, {
      name: "Iron Man",
      email: "ts@av.com",
      phone: "111-222-3333",
    });
    await user.click(screen.getByRole("button", { name: "Update Contact" }));

    expect(within(favorites()).getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Contact was updated.");
  });

  it("leaves edit mode when the edited contact is deleted", async () => {
    const user = userEvent.setup();
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Edit Tony Stark" }));
    await user.click(screen.getByRole("button", { name: "Delete Tony Stark" }));

    expect(screen.queryByText("Tony Stark")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Contact" })).toBeInTheDocument();
  });

  it("removes all contacts after confirming", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Remove All" }));

    expect(screen.getAllByText("No contacts.")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Remove All" })).toBeDisabled();
  });

  it("adds a random contact", async () => {
    const user = userEvent.setup();
    fetchRandomContact.mockResolvedValue({
      name: "Baltasar Freitas",
      email: "baltasar.freitas@example.com",
      phone: "(21) 8287-4873",
    });
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Add Random Contact" }));

    expect(await within(general()).findByText("Baltasar Freitas")).toBeInTheDocument();
  });

  it("shows an error when the random contact request fails", async () => {
    const user = userEvent.setup();
    fetchRandomContact.mockRejectedValue(new Error("network"));
    render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Add Random Contact" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not load a random contact",
    );
  });

  it("persists contacts to localStorage", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<ContactIndex />);

    await user.click(screen.getByRole("button", { name: "Delete Tony Stark" }));
    unmount();
    render(<ContactIndex />);

    expect(screen.queryByText("Tony Stark")).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toHaveLength(2);
  });
});
