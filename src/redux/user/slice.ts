import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    paramaters: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(`http://82.157.43.234:8080/auth/login`, {
      email: paramaters.email,
      password: paramaters.password,
    });
    return (data as {token: string}).token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
