// src/components/SweetCard/SweetCard.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import SweetCard from "./index";
import { describe, test, expect, vi } from "vitest";

describe("SweetCard Component", () => {
  const sweet = {
    id: "1",
    name: "Laddu",
    category: "INDIAN",
    price: 50,
    quantity: 5,
  };

  test("renders sweet details correctly", () => {
    render(<SweetCard sweet={sweet} role="USER" onPurchase={vi.fn()} />);

    expect(screen.getByText("Laddu")).toBeInTheDocument();
    expect(screen.getByText(/Price: 50/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity: 5/i)).toBeInTheDocument();
  });

  test("shows Purchase button enabled when quantity > 0", () => {
    render(<SweetCard sweet={sweet} role="USER" onPurchase={vi.fn()} />);
    expect(screen.getByRole("button", { name: /purchase/i })).toBeEnabled();
  });

  test("disables Purchase button when quantity = 0", () => {
    const outOfStockSweet = { ...sweet, quantity: 0 };
    render(<SweetCard sweet={outOfStockSweet} role="USER" onPurchase={vi.fn()} />);
    expect(screen.getByRole("button", { name: /purchase/i })).toBeDisabled();
  });

  test("shows Edit and Delete buttons for ADMIN role", () => {
    render(<SweetCard sweet={sweet} role="ADMIN" onPurchase={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("calls onPurchase when Purchase button clicked", () => {
    const mockPurchase = vi.fn();
    render(<SweetCard sweet={sweet} role="USER" onPurchase={mockPurchase} />);
    fireEvent.click(screen.getByRole("button", { name: /purchase/i }));
    expect(mockPurchase).toHaveBeenCalledWith(sweet.id);
  });
});
