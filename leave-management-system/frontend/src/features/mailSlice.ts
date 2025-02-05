import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LeaveRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
}

interface LeaveApprovedPayload {
  startDate: string;
  endDate: string;
  leaveType: string;
  email: string;
}

interface initialState {
  value: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialState = {
  value: null,
  loading: false,
  error: null,
};

export const registrationMail = createAsyncThunk(
  "registrationMail",
  async ({ firstName, lastName, email, password }: RegistrationPayload) => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await fetch(
      "http://localhost:4000/api/registration-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in registration main", error);
    }
  }
);

export const leaveRequestMail = createAsyncThunk(
  "leaveRequestMail",
  async ({
    firstName,
    lastName,
    email,
    startDate,
    endDate,
    leaveType,
    reason,
  }: LeaveRequestPayload) => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
      reason: reason,
    };
    const response = await fetch(
      "http://localhost:4000/api/leave-request-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in registration main", error);
    }
  }
);

export const leaveApprovedMail = createAsyncThunk(
  "leaveApprovedMail",
  async ({ email, startDate, endDate, leaveType }: LeaveApprovedPayload) => {
    const data = {
      email: email,
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
    };
    const response = await fetch(
      "http://localhost:4000/api/leave-approved-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in registration main", error);
    }
  }
);

export const leaveCanceledMail = createAsyncThunk(
  "leaveCanceledMail",
  async ({ email, startDate, endDate, leaveType }: LeaveApprovedPayload) => {
    const data = {
      email: email,
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
    };
    const response = await fetch(
      "http://localhost:4000/api/leave-canceled-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in registration main", error);
    }
  }
);

const mailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrationMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrationMail.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(registrationMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Somethinf is wrong...!";
      })
      .addCase(leaveRequestMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveRequestMail.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(leaveRequestMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Somethinf is wrong...!";
      })
      .addCase(leaveApprovedMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveApprovedMail.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(leaveApprovedMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Somethinf is wrong...!";
      })
      .addCase(leaveCanceledMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveCanceledMail.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(leaveCanceledMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Somethinf is wrong...!";
      });
  },
});

export default mailSlice.reducer;
