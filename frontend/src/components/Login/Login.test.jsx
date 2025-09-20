import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./index";
import { describe, it, expect, vi } from "vitest";

describe("Login Component", () => {
  it("renders username and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("allows typing into fields", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "secret123");

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("secret123");
  });

  it("calls onSubmit with username and password", async () => {
    const handleSubmit = vi.fn();
    render(<Login onSubmit={handleSubmit} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "testuser");
    await user.type(screen.getByLabelText(/password/i), "secret123");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      userName: "testuser",
      password: "secret123",
    });
  });
});
