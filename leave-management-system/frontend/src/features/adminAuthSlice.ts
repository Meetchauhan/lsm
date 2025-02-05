import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RequestPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  value: {
    id: string;
  };
  success: boolean;
  message: string;
}

interface AuthState {
  value: LoginResponse | null;
  loading: boolean;
  error: string | null;
  adminNavigation: string | null;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const adminLogin = createAsyncThunk<LoginResponse, RequestPayload>(
  "adminLogin",
  async ({ email, password }) => {
    const data = { email, password };
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const result: LoginResponse = await response.json();
    return result;
  }
);

export const adminLogout = createAsyncThunk("adminLogout", async () => {
  const response = await fetch(`${API_BASE_URL}/admin/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in logout", error);
  }
});

export const adminNavigation = createAsyncThunk("adminNavigation", async () => {
  const response = await fetch(`${API_BASE_URL}/admin-navigation`, {
    credentials: "include",
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in auth navigation", error);
  }
});

const initialState: AuthState = {
  value: null,
  loading: false,
  error: null,
  adminNavigation: null,
};

const adminAuth = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        localStorage.removeItem("admin-auth");
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(adminNavigation.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.adminNavigation = action.payload;
        localStorage.setItem("admin-auth", JSON.stringify(action.payload));
      })
      .addCase(adminNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        localStorage.removeItem("admin-auth");
      });
  },
});

export default adminAuth.reducer;
