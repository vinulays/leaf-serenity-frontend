import { createSlice } from "@reduxjs/toolkit";
import { getAllPlants, getPlantById } from "./plantsActions";

const initialState = {
  loading: false,
  plants: [],
  plantInfo: null,
  error: null,
  status: "idle",
  plantStatus: "idle",
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
    [getPlantById.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.plantStatus = "loading";
    },
    [getPlantById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.plantInfo = payload;
      state.plantStatus = "successful;";
    },
    [getPlantById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.plantStatus = "failed";
    },
  },
});

export default plantsSlice.reducer;
