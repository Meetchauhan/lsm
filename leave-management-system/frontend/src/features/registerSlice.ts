import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the shape of your login response (customize this based on your API response structure)
interface RegisterResponse {
  success: boolean | null ;
  user: {
    id: string;
    email: string;

    // Add other user details here
  };
  message: string | null;
  value: string | null;
}

interface UserAlreadyExist {
  success: boolean;
  message: string | null;
}

interface authNavigationResponse {
  success: string;
  message: string;
}

// Define the shape of your auth slice state
interface AuthState {
  value: RegisterResponse | UserAlreadyExist | null; // Can be null if no user is logged in
  loading: boolean;
  error: string | null;
  navigation: authNavigationResponse | null;
}

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
// The login async thunk that performs the login API request

export const register = createAsyncThunk<RegisterResponse, RegisterParams>(
  "auth/register",
  async ({ firstName, lastName, email, password }) => {
    const data = { firstName, lastName, email, password };

    const response = await fetch("http://localhost:4000/api/user/register", {
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

    const result: RegisterResponse = await response.json();
    return result;
  }
);

export const adminRegister = createAsyncThunk<RegisterResponse, RegisterParams>(
  "adminRegister",
  async ({ firstName, lastName, email, password }) => {
    const data = { firstName, lastName, email, password };

    const response = await fetch("http://localhost:4000/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to Register ");
    }

    const result: RegisterResponse = await response.json();
    return result;
  }
);

const initialState: AuthState = {
  value: null,
  loading: false,
  error: null,
  navigation: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default registerSlice.reducer;
