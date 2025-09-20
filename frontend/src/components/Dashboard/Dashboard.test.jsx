// src/components/__tests__/Dashboard.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Dashboard from "../Dashboard";
import { fetchSweets } from "../../store/slice/SweetSlice";
import toast from "react-hot-toast";
import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("../../redux/slices/sweetSlice", () => ({
  fetchSweets: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  success: vi.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Dashboard Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      sweets: {
        items: [],
        loading: false,
        error: null,
      },
    });
  });

  test("renders loader when loading", () => {
    store = mockStore({
      sweets: { items: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders sweet cards when data is available", () => {
    store = mockStore({
      sweets: {
        items: [
          { id: 1, name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 5 },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Laddu/i)).toBeInTheDocument();
  });

  test("shows 'No items found' when filter results are empty", () => {
    store = mockStore({
      sweets: { items: [], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });

  test("filters sweets by name", async () => {
    store = mockStore({
      sweets: {
        items: [
          { id: 1, name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 5 },
          { id: 2, name: "Barfi", category: "MILK_BASED", price: 70, quantity: 3 },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by name/i), {
      target: { value: "Barfi" },
    });

    expect(await screen.findByText(/Barfi/i)).toBeInTheDocument();
    expect(screen.queryByText(/Laddu/i)).not.toBeInTheDocument();
  });

  test("filters sweets by category", async () => {
    store = mockStore({
      sweets: {
        items: [
          { id: 1, name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 5 },
          { id: 2, name: "Chocolate Fudge", category: "CHOCOLATE", price: 100, quantity: 2 },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "CHOCOLATE" },
    });

    expect(await screen.findByText(/Chocolate Fudge/i)).toBeInTheDocument();
    expect(screen.queryByText(/Laddu/i)).not.toBeInTheDocument();
  });

  test("filters sweets by price range", async () => {
    store = mockStore({
      sweets: {
        items: [
          { id: 1, name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 5 },
          { id: 2, name: "Premium Barfi", category: "MILK_BASED", price: 200, quantity: 2 },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Min Price/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Max Price/i), { target: { value: 250 } });

    expect(await screen.findByText(/Premium Barfi/i)).toBeInTheDocument();
    expect(screen.queryByText(/Laddu/i)).not.toBeInTheDocument();
  });

  test("displays toast message on successful purchase", async () => {
    store = mockStore({
      sweets: {
        items: [
          { id: 1, name: "Laddu", category: "TRADITIONAL", price: 50, quantity: 5 },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Purchase/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Purchase successful!");
    });
  });
});
