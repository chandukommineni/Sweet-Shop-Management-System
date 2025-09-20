// src/components/SweetCard/SweetCard.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import SweetCard from "./index";
import { describe, it, expect, vi } from "vitest";

describe("SweetCard Component", () => {
  const baseSweet = {
    id: 1,
    name: "Gulab Jamun",
    category: "TRADITIONAL",
    price: 50,
    quantity: 5,
  };

  it("renders sweet details", () => {
    render(<SweetCard sweet={baseSweet} role="USER" onPurchase={() => {}} />);

    expect(screen.getByText("Gulab Jamun")).toBeInTheDocument();
    expect(screen.getByText(/Category:/i)).toHaveTextContent("TRADITIONAL");
    expect(screen.getByText(/₹50/)).toBeInTheDocument();
  });

  it("calls onPurchase with correct id and quantity", () => {
    const handlePurchase = vi.fn();
    render(<SweetCard sweet={baseSweet} role="USER" onPurchase={handlePurchase} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "2" } });

    fireEvent.click(screen.getByRole("button", { name: /Purchase/i }));

    expect(handlePurchase).toHaveBeenCalledWith(1, 2);
  });

  it("resets quantity after purchase", () => {
    const handlePurchase = vi.fn();
    render(<SweetCard sweet={baseSweet} role="USER" onPurchase={handlePurchase} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3" } });

    fireEvent.click(screen.getByRole("button", { name: /Purchase/i }));

    expect(input.value).toBe("1"); // reset to 1 after purchase
  });

  it("disables input and button when out of stock", () => {
    render(
      <SweetCard
        sweet={{ ...baseSweet, quantity: 0 }}
        role="USER"
        onPurchase={() => {}}
      />
    );

    const input = screen.getByRole("spinbutton");
    const button = screen.getByRole("button", { name: /Out of Stock/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("shows stock info for ADMIN", () => {
    render(
      <SweetCard
        sweet={baseSweet}
        role="ADMIN"
        onPurchase={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText(/Stock Available:/i)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders Edit and Delete buttons for ADMIN", () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <SweetCard
        sweet={baseSweet}
        role="ADMIN"
        onPurchase={() => {}}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(handleEdit).toHaveBeenCalledWith(baseSweet);

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
