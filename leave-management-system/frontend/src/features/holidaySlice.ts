import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AddHolidayPayload {
  holidayDate: string;
  holidayReason: string;
}

interface AddHolidayResponse {
  success: true;
  data: {
    holidayDate: string;
    holidayReason: string;
  };
}

interface InitialState {
  value: {
    data: [];
  };
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  value: {
    data: [],
  },
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const holidayList = createAsyncThunk("holidayList", async () => {
  const response = await fetch(`${API_BASE_URL}/holidaylist`);
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetch holiday list", error);
  }
});

export const addHoliday = createAsyncThunk<
  AddHolidayResponse,
  AddHolidayPayload
>("addHoliday", async ({ holidayDate, holidayReason }) => {
  const data = {
    holidayDate: holidayDate,
    holidayReason: holidayReason,
  };
  const response = await fetch(`${API_BASE_URL}/add-holiday`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Error in adding holiday", error);
  }
});

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(holidayList.pending, (state) => {
        state.loading = true;
      })
      .addCase(holidayList.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(holidayList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something is wrong!";
      })
      .addCase(addHoliday.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHoliday.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something is wrong!";
      });
  },
});

export default holidaySlice.reducer;
