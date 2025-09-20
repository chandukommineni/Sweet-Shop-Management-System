import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api/Api";

// Fetch all sweets
export const fetchSweets = createAsyncThunk(
  "sweets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get("/sweets");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔎 Search sweets
export const searchSweets = createAsyncThunk(
  "sweets/search",
  async ({ name, category, minPrice, maxPrice }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (category) params.append("category", category);
      if (minPrice !== undefined) params.append("minPrice", minPrice);
      if (maxPrice !== undefined) params.append("maxPrice", maxPrice);

      const res = await Api.get(`/sweets/search?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add sweet
export const addSweet = createAsyncThunk(
  "sweets/add",
  async (sweetData, { rejectWithValue }) => {
    try {
      const res = await Api.post("/sweets", sweetData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update sweet
export const updateSweet = createAsyncThunk(
  "sweets/update",
  async ({ id, sweetData }, { rejectWithValue }) => {
    try {
      const res = await Api.put(`/sweets/${id}`, sweetData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete sweet
export const deleteSweet = createAsyncThunk(
  "sweets/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Api.delete(`/sweets/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Purchase sweet
export const purchaseSweet = createAsyncThunk(
  "sweets/purchase",
  async ({ id, quantity = 1 }, { rejectWithValue }) => {
    try {
      if (quantity > 1) {
        const res = await Api.post(
          `/sweets/${id}/purchase/quantity?quantity=${quantity}`
        );
        return { id, message: res.data, quantity };
      } else {
        const res = await Api.post(`/sweets/${id}/purchase`);
        return { id, message: res.data, quantity: 1 };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Restock sweet
export const restockSweet = createAsyncThunk(
  "sweets/restock",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      await Api.post(`/sweets/${id}/restock?quantity=${quantity}`);
      return { id, quantity };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const sweetSlice = createSlice({
  name: "sweets",
  initialState: {
    items: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sweets
      .addCase(fetchSweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSweets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search sweets
      .addCase(searchSweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSweets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchSweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add sweet
      .addCase(addSweet.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.message = "Sweet added successfully!";
      })

      // Update sweet
      .addCase(updateSweet.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.message = "Sweet updated successfully!";
      })

      // Delete sweet
      .addCase(deleteSweet.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
        state.message = "Sweet deleted successfully!";
      })

      // Purchase sweet
      .addCase(purchaseSweet.fulfilled, (state, action) => {
        const sweet = state.items.find((s) => s.id === action.payload.id);
        if (sweet && sweet.quantity >= action.payload.quantity) {
          sweet.quantity -= action.payload.quantity;
        }
        state.message = action.payload.message;
      })

      // Restock sweet
      .addCase(restockSweet.fulfilled, (state, action) => {
        const sweet = state.items.find((s) => s.id === action.payload.id);
        if (sweet) {
          sweet.quantity += action.payload.quantity;
        }
        state.message = "Sweet restocked successfully!";
      });
  },
});

export const { clearMessage } = sweetSlice.actions;
export default sweetSlice.reducer;
