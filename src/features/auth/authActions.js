import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await axios
        .post("/register", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.userToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
