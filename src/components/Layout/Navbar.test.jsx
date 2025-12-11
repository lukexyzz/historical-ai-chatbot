import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "./Navbar";

vi.mock("../UI/Button/HomeButton", () => ({
  default: () => <div data-testid="home-button">HomeButton</div>,
}));

// Mock SidebarContext
const mockOpenSidebar = vi.fn();
vi.mock("../../context/SidebarContext", () => ({
  useSidebar: () => ({
    openSidebar: mockOpenSidebar,
  }),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with persona name", () => {
    render(<Navbar personaName="Cleopatra" />);
    expect(screen.getByText("Talk with Cleopatra")).toBeInTheDocument();
    expect(screen.getByTestId("home-button")).toBeInTheDocument();
  });

  it("renders default title if no persona name provided", () => {
    render(<Navbar />);
    expect(screen.getByText("Talk with ...")).toBeInTheDocument();
  });

  it("calls openSidebar when menu button is clicked", () => {
    render(<Navbar />);

    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    expect(mockOpenSidebar).toHaveBeenCalledTimes(1);
  });
});
