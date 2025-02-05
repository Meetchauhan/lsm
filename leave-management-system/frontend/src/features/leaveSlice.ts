import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LeaveRequestPayload {
  startDate: string;
  endDate: string;
  allDates: string[];
  email: string;
  reason: string;
  leaveType: string;
}

interface LeaveStatusPayload {
  leaveId: string;
  status: string;
  userId: string;
}

// Define the response type returned by the API
interface LeaveRequestResponse {
  success: boolean;
  message: string;
  data: [];
  status: string;
  leavPerPage: string;
  totalPages: string | number;
  currentPage: string | number;
}

interface LeaveState {
  request: LeaveRequestResponse | null;
  loading: boolean;
  error: string | undefined | null;
  fetchLeave: LeaveRequestResponse | null;
  allLeaves: LeaveRequestResponse | null;
}

const initialState: LeaveState = {
  request: null,
  loading: false,
  fetchLeave: null,
  error: null,
  allLeaves: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const leaveRequest = createAsyncThunk<
  LeaveRequestResponse,
  LeaveRequestPayload
>(
  "leaveRequest",
  async ({ startDate, endDate, allDates, email, reason, leaveType }) => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      allDates: allDates,
      email: email,
      reason: reason,
      leaveType: leaveType,
    };
    const response = await fetch(`${API_BASE_URL}/new-leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in leave request", error);
    }
  }
);

export const allLeaves = createAsyncThunk<
  LeaveRequestResponse,
  { leavePerPage: string | number; page: string | number }
>("allLeaves", async ({ leavePerPage, page }) => {
  const response = await fetch(
    `${API_BASE_URL}/all-leaves/${leavePerPage}/${page}`
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetch leave", error);
  }
});

export const fetchLeave = createAsyncThunk<LeaveRequestResponse>(
  "fetchLeave",
  async () => {
    const response = await fetch(`${API_BASE_URL}/user-leaves`, {
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in fetch leave", error);
    }
  }
);

export const leaveStatus = createAsyncThunk<
  LeaveRequestResponse,
  LeaveStatusPayload
>("leaveStatus", async ({ leaveId, status, userId }) => {
  const data = {
    leaveId: leaveId,
    status: status,
    userId: userId,
  };
  const response = await fetch(`${API_BASE_URL}/leave-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in leave request", error);
  }
});

export const leaveTaken = createAsyncThunk("leaveTaken", async () => {
  const response = await fetch(`${API_BASE_URL}/leave-taken`);
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in leave taken", error);
  }
});

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(leaveRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(leaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchLeave = action.payload;
      })
      .addCase(fetchLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(leaveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(leaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(allLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(allLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.allLeaves = action.payload;
      })
      .addCase(allLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(leaveTaken.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveTaken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(leaveTaken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leaveSlice.reducer;
