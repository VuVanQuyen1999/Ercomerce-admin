import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "auth/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderByUserId = createAsyncThunk(
  "auth/get-order-by-user-id",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrderByUserId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthlyOrders = createAsyncThunk(
  "auth/get-monthly-orders",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyStats = createAsyncThunk(
  "auth/get-yearly-orders",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "auth/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "auth/update-order",
  async (orderData, thunkAPI) => {
    try {
      return await authService.updateOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMonthlyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
      })
      .addCase(getMonthlyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getYearlyStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
      })
      .addCase(getYearlyStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderData = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderDataAfterUpdate = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
