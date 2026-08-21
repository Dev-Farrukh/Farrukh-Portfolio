import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the logo image with accessible name matching /farrukh noman/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /farrukh noman/i })).toBeInTheDocument();
  });

  it("renders the Farrukh Noman wordmark when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("farrukh noman")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("farrukh noman")).not.toBeInTheDocument();
  });
});
