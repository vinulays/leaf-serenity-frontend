import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPlants = createAsyncThunk(
  "plants/getAll",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/plants", {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getPlantById = createAsyncThunk(
  "plants/getPlantById",
  async (plantId, thunkAPI) => {
    try {
      const response = await axios.get(`/plants/${plantId}`, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
