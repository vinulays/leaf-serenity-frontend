import { createSlice } from "@reduxjs/toolkit";
import { getAllPlants } from "./plantsActions";

const initialState = {
  loading: false,
  plants: [],
  error: null,
  status: "idle",
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPlants.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.status = "loading";
    },
    [getAllPlants.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.plants = payload;
      state.status = "successful";
    },
    [getAllPlants.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.status = "failed";
    },
  },
});

export default plantsSlice.reducer;
