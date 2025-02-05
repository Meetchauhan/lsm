import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the shape of your login response (customize this based on your API response structure)
interface LoginResponse {
  user: {
    id: string;
    email: string;
    // Add other user details here
  };
  success: boolean;
  message: string;
}

interface authNavigationResponse {
  success: string;
  message: string;
}

// Define the shape of your auth slice state
interface AuthState {
  value: LoginResponse | null; // Can be null if no user is logged in
  loading: boolean;
  error: string | null;
  navigation: authNavigationResponse | null;
}

// Define the input parameters for the login async thunk
interface LoginParams {
  email: string;
  password: string;
}

// The login async thunk that performs the login API request
export const login = createAsyncThunk<LoginResponse, LoginParams>(
  "auth/login",
  async ({ email, password }) => {
    const data = { email, password };

    const response = await fetch("http://localhost:4000/api/user/login", {
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

export const logout = createAsyncThunk("logout", async () => {
  const response = await fetch("http://localhost:4000/api/user/logout", {
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

export const authNavigation = createAsyncThunk("authNavigation", async () => {
  const response = await fetch("http://localhost:4000/api/auth-navigation", {
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
  navigation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        localStorage.removeItem("auth");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(authNavigation.pending, (state) => {
        state.loading = true;
      })
      .addCase(authNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.navigation = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(authNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        localStorage.removeItem("auth");
      });
  },
});

export default authSlice.reducer;
