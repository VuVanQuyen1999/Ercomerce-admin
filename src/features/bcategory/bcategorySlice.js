import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getBCategory = createAsyncThunk(
  "brand/get-BCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBCategories = createAsyncThunk(
  "bCategory/get-BCategories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBCategory = createAsyncThunk(
  "bCategory/create-BCategory",
  async (categoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBCategory = createAsyncThunk(
  "bCategory/update-BCategory",
  async (blogCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.updateBCategory(blogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBCategory = createAsyncThunk(
  "bCategory/delete-BCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getBCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBCategory = action.payload;
      })
      .addCase(createBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBCategory = action.payload;
      })
      .addCase(updateBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBCategory = action.payload;
      })
      .addCase(deleteBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCategorySlice.reducer;
