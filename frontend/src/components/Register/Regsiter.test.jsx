// src/components/Register/Register.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./index";
import { describe, test, expect, jest } from "@jest/globals";

describe("Register Component", () => {
  test("renders input fields and submit button", () => {
    render(<Register handleSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("calls handleSubmit with form data", () => {
    const mockHandleSubmit = jest.fn();
    render(<Register handleSubmit={mockHandleSubmit} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "chandu" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "chandu@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: "ADMIN" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      userName: "chandu",
      email: "chandu@example.com",
      password: "secret",
      role: "ADMIN",
    });
  });
});
