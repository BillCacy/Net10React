import { StrictMode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SampleDemo from "./SampleDemo";

const mountButton = () => screen.getByRole("button", { name: "Mount Component" });

describe("SampleDemo", () => {
  it("starts with the child unmounted and no stray output", () => {
    const { container } = render(<SampleDemo />);
    expect(mountButton()).toBeInTheDocument();
    expect(screen.queryByText(/Child Counter/)).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/0$/);
  });

  it("mounts, focuses the input, and unmounts the child", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SampleDemo />);

    await user.click(mountButton());
    expect(screen.getByLabelText("Focus me on mount")).toHaveFocus();
    expect(log).toHaveBeenCalledWith("Component Mounted");

    await user.click(screen.getByRole("button", { name: "Unmount Component" }));
    expect(screen.queryByText(/Child Counter/)).not.toBeInTheDocument();
    expect(log).toHaveBeenCalledWith("Component Unmounted");
  });

  it("tracks the child's previous value and render count", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SampleDemo />);
    await user.click(mountButton());

    expect(screen.getByText(/Previous Value: none/)).toBeInTheDocument();
    expect(screen.getByText("Total Renders:")).toHaveTextContent("1");

    const increment = screen.getByRole("button", { name: "Increment Child Counter" });
    await user.click(increment);
    await user.click(increment);

    expect(screen.getByText(/Child Counter : 2/)).toHaveTextContent("Previous Value: 1");
    expect(screen.getByText("Total Renders:")).toHaveTextContent("3");
  });

  it("logs updates but not the initial mount, even under StrictMode", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <StrictMode>
        <SampleDemo />
      </StrictMode>,
    );
    await user.click(mountButton());

    expect(log).not.toHaveBeenCalledWith("Child Counter Update: ", 0);
    expect(log).not.toHaveBeenCalledWith("Parent Counter Update: ", 0);

    await user.click(screen.getByRole("button", { name: "Increment Parent Counter" }));
    expect(log).toHaveBeenCalledWith("Parent Counter Update: ", 1);

    await user.click(screen.getByRole("button", { name: "Increment Child Counter" }));
    expect(log).toHaveBeenCalledWith("Child Counter Update: ", 1);
  });
});
