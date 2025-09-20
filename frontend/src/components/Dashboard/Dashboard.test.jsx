import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashBoard from "./index";

// --- Mocks ---
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));

vi.mock("../components/SweetCard", () => ({
  default: ({ sweet, onPurchase }) => (
    <div data-testid="sweet-card">
      <span>{sweet.name}</span>
      <button onClick={() => onPurchase(sweet.id)}>Buy</button>
    </div>
  ),
}));

// Mock actions
import * as SweetSlice from "../../store/slice/SweetSlice.js";
vi.mock("../../store/slice/SweetSlice.js", () => ({
  fetchSweets: vi.fn(() => ({ type: "fetchSweets" })),
  searchSweets: vi.fn(() => ({ type: "searchSweets" })),
  purchaseSweet: vi.fn(() => ({ type: "purchaseSweet" })),
}));

describe("DashBoard Component", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((fn) =>
      fn({
        sweets: {
          items: [],
          loading: false,
          error: null,
        },
      })
    );
    vi.clearAllMocks();
  });

  it("dispatches fetchSweets on mount", () => {
    render(<DashBoard />);
    expect(mockDispatch).toHaveBeenCalledWith(SweetSlice.fetchSweets());
  });

  it("renders loader when loading is true", () => {
    useSelector.mockImplementation((fn) =>
      fn({ sweets: { items: [], loading: true, error: null } })
    );
    render(<DashBoard />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders error message", () => {
    useSelector.mockImplementation((fn) =>
      fn({ sweets: { items: [], loading: false, error: "Error loading" } })
    );
    render(<DashBoard />);
    expect(screen.getByText("Error loading")).toBeInTheDocument();
  });

  it("renders empty state when no sweets", () => {
    render(<DashBoard />);
    expect(screen.getByText("No sweets found 🍬")).toBeInTheDocument();
  });

  it("renders sweet cards when items exist", () => {
    useSelector.mockImplementation((fn) =>
      fn({
        sweets: {
          items: [{ id: 1, name: "Ladoo" }, { id: 2, name: "Barfi" }],
          loading: false,
          error: null,
        },
      })
    );
    render(<DashBoard />);
    expect(screen.getAllByTestId("sweet-card")).toHaveLength(2);
  });

  it("handles search with filters", () => {
    render(<DashBoard />);
    fireEvent.change(screen.getByPlaceholderText("Search by Name"), {
      target: { value: "lad" },
    });
    fireEvent.click(screen.getByText("Search"));
    expect(mockDispatch).toHaveBeenCalledWith(
      SweetSlice.searchSweets({
        name: "lad",
        category: "",
        minPrice: undefined,
        maxPrice: undefined,
      })
    );
  });

  it("clears filters and refetches sweets", () => {
    render(<DashBoard />);
    fireEvent.change(screen.getByPlaceholderText("Search by Name"), {
      target: { value: "lad" },
    });
    fireEvent.click(screen.getByText("Clear"));
    expect(mockDispatch).toHaveBeenCalledWith(SweetSlice.fetchSweets());
    expect(screen.getByPlaceholderText("Search by Name").value).toBe("");
  });

  it("handles purchase", async () => {
    useSelector.mockImplementation((fn) =>
      fn({
        sweets: {
          items: [{ id: 1, name: "Ladoo" }],
          loading: false,
          error: null,
        },
      })
    );
    render(<DashBoard />);
    fireEvent.click(screen.getByText("Buy"));
    expect(mockDispatch).toHaveBeenCalledWith(
      SweetSlice.purchaseSweet({ id: 1, quantity: 1 })
    );
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        "Sweet purchased successfully 🎉"
      )
    );
  });
});
