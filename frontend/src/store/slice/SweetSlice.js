
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Api} from "../../api/Api";


export const fetchSweets = createAsyncThunk(
  "sweets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get("/api/sweets");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const addSweet = createAsyncThunk(
  "sweets/add",
  async (sweetData, { rejectWithValue }) => {
    try {
      const res = await Api.post("/api/sweets", sweetData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateSweet = createAsyncThunk(
  "sweets/update",
  async ({ id, sweetData }, { rejectWithValue }) => {
    try {
      const res = await Api.put(`/api/sweets/${id}`, sweetData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const deleteSweet = createAsyncThunk(
  "sweets/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Api.delete(`/api/sweets/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const purchaseSweet = createAsyncThunk(
  "sweets/purchase",
  async ({ id, quantity = 1 }, { rejectWithValue }) => {
    try {
      if (quantity > 1) {
        const res = await Api.post(
          `/api/sweets/${id}/purchase/quantity?quantity=${quantity}`
        );
        return { id, message: res.data };
      } else {
        const res = await Api.post(`/api/sweets/${id}/purchase`);
        return { id, message: res.data };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const restockSweet = createAsyncThunk(
  "sweets/restock",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      await Api.post(`/api/sweets/${id}/restock?quantity=${quantity}`);
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
        if (sweet && sweet.quantity > 0) {
          sweet.quantity -= 1; // Decrease local stock
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
