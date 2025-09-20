import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SweetForm from "./index";

describe("SweetForm Component", () => {
  it("renders empty form when no sweet is passed", () => {
    render(<SweetForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Sweet Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Category/i)).toHaveValue("");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(null);
    expect(screen.getByRole("button", { name: /Add Sweet/i })).toBeInTheDocument();
  });

  it("renders form with pre-filled values when sweet is provided", () => {
    const sweet = { name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 10 };
    render(<SweetForm sweet={sweet} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Sweet Name/i)).toHaveValue("Laddu");
    expect(screen.getByLabelText(/Category/i)).toHaveValue("TRADITIONAL");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(50);
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(10);
    expect(screen.getByRole("button", { name: /Update Sweet/i })).toBeInTheDocument();
  });

  it("updates form fields on user input", () => {
    render(<SweetForm onSubmit={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Sweet Name/i), { target: { value: "Barfi" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "MILK_BASED" } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: "5" } });

    expect(screen.getByLabelText(/Sweet Name/i)).toHaveValue("Barfi");
    expect(screen.getByLabelText(/Category/i)).toHaveValue("MILK_BASED");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(100);
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(5);
  });

  it("calls onSubmit with form data when submitted", () => {
    const handleSubmit = vi.fn();
    render(<SweetForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Sweet Name/i), { target: { value: "Jalebi" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "TRADITIONAL" } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: "12" } });

    fireEvent.submit(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Jalebi",
      category: "TRADITIONAL",
      price: "80",
      quantity: "12",
    });
  });

  it("requires all fields before submission", () => {
    const handleSubmit = vi.fn();
    render(<SweetForm onSubmit={handleSubmit} />);

    fireEvent.submit(screen.getByRole("button"));

    // Since HTML5 form validation prevents submit, onSubmit should not be called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
