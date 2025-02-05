import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileData {
  data: {
    firstName: string;
    lastName: string;
    email: string | "" | undefined;
    _id: string | "" | undefined;
    password: string | "" | undefined;
  };
}

interface LeaveState {
  value: ProfileData | null;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: LeaveState = {
  value: null,
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProfile = createAsyncThunk<ProfileData, void>(
  "getProfile",
  async () => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in get profile", error);
    }
  }
);

export const getAdminProfile = createAsyncThunk<ProfileData, void>(
  "getAdminProfile",
  async () => {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in get profile", error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
