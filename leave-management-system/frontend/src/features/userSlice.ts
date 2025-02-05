import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ResponseData {
  data: [] | null;
}

interface InitialStateType {
  data: ResponseData | null;
  error: string | null;
  loading: boolean;
}

interface EditUserPayloadAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  availableLeave: number | string;
}
interface EditUserResponseAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  availableLeave: number | string;
}

interface EditUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface EditUserResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getUsers = createAsyncThunk("getUsers", async () => {
  const response = await fetch(`${API_BASE_URL}/user/all-users`);
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in get users", error);
  }
});

export const editUserAdmin = createAsyncThunk<
  EditUserResponseAdmin,
  EditUserPayloadAdmin
>(
  "editUserAdmin",
  async ({ _id, firstName, lastName, email, password, availableLeave }) => {
    const data = {
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      availableLeave: availableLeave,
    };
    const response = await fetch(`${API_BASE_URL}/user/editUser-admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in edit user", error);
    }
  }
);

export const editUser = createAsyncThunk<EditUserResponse, EditUserPayload>(
  "editUser",
  async ({ firstName, lastName, email, password }) => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await fetch(`${API_BASE_URL}/user/editUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in edit user", error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (_id: string) => {
    const response = await fetch(`${API_BASE_URL}/user/delete-user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in delete user", error);
    }
  }
);

const initialState: InitialStateType = {
  data: null,
  error: null,
  loading: false,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something gets wrong...!";
      })
      .addCase(editUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something gets wrong...!";
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something gets wrong...!";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something gets wrong...!";
      });
  },
});

export default users.reducer;
