import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChatMessage from "./ChatMessage";

describe("ChatMessage Component", () => {
  it("renders user message correctly", () => {
    const msg = {
      role: "user",
      text: "Hello AI",
      name: "You",
      timestamp: "10:00 AM",
    };
    render(<ChatMessage msg={msg} />);

    expect(screen.getByText("Hello AI")).toBeInTheDocument();
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });

  it("renders api message correctly", () => {
    const msg = {
      role: "api",
      text: "Hello Human",
      name: "Cleopatra",
      timestamp: "10:01 AM",
    };
    render(<ChatMessage msg={msg} />);

    expect(screen.getByText("Hello Human")).toBeInTheDocument();
    expect(screen.getByText("Cleopatra")).toBeInTheDocument();
  });
});
