// src/components/Navbar/Navbar.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../store/slice/AuthSlice", () => ({
  logout: vi.fn(() => ({ type: "auth/logout" })),
}));

const mockStore = configureStore([]);

const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo and title", () => {
    const store = mockStore({ auth: { user: null, expiresAt: null } });

    renderWithStore(store);

    expect(screen.getByAltText(/SweetShop Logo/i)).toBeInTheDocument();
  });

  it("renders welcome message and logout button when user exists", () => {
    const store = mockStore({
      auth: { user: { userName: "Chandu" }, expiresAt: Date.now() + 10000 },
    });

    renderWithStore(store);

    expect(screen.getByText(/Welcome,/i)).toBeInTheDocument();
    expect(screen.getByText(/Chandu/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("dispatches logout when Logout button is clicked", () => {
    const store = mockStore({
      auth: { user: { userName: "Chandu" }, expiresAt: Date.now() + 10000 },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "auth/logout" });
  });

  it("auto-logs out if expiresAt is in the past (only once)", () => {
    const store = mockStore({
      auth: { user: { userName: "Expired" }, expiresAt: Date.now() - 1000 },
    });

    const { rerender } = renderWithStore(store);

    let actions = store.getActions();
    expect(actions).toContainEqual({ type: "auth/logout" });

    // clear actions and rerender to simulate re-render
    store.clearActions();
    rerender(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    actions = store.getActions();
    expect(actions).not.toContainEqual({ type: "auth/logout" });
  });

  it("does not render logout button when user is null", () => {
    const store = mockStore({ auth: { user: null, expiresAt: null } });

    renderWithStore(store);

    expect(screen.queryByRole("button", { name: /logout/i })).toBeNull();
  });
});
