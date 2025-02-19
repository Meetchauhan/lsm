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

interface EditHolidayPayload {
  _id: string;
  holidayDate: string;
  holidayReason: string;
}

interface EditHolidayResponse {
  success: boolean;
  data: {
    _id: string;
    holidayDate: string;
    holidayReason: string;
  };
}

interface DeleteHolidayPayload {
  _id: string;
}

interface DeleteHolidayResponse {
  success: boolean;
}

interface InitialStateValue {
  _id: string;
  holidayDate: string;
  holidayReason: string;
}

interface InitialState {
  value: {
    data: [];
  };
  upcomingHolidays: {
    data: [];
  };
  editHolidayValue: InitialStateValue | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  value: {
    data: [],
  },
  upcomingHolidays: {
    data: [],
  },
  editHolidayValue: null,
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

export const upcomingHolidays = createAsyncThunk(
  "upcomingHolidays",
  async () => {
    const response = await fetch(`${API_BASE_URL}/upcoming-holidays`);
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in fetch upcoming holiday list", error);
    }
  }
);

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

export const editHoliday = createAsyncThunk<
  EditHolidayResponse,
  EditHolidayPayload
>("editHoliday", async ({ _id, holidayDate, holidayReason }) => {
  const data = {
    _id: _id,
    holidayDate: holidayDate,
    holidayReason: holidayReason,
  };
  const response = await fetch(`${API_BASE_URL}/edit-holiday`, {
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
    console.error("Error in fetch upcoming holiday list", error);
  }
});

export const deleteHoliday = createAsyncThunk<
  DeleteHolidayResponse,
  DeleteHolidayPayload
>("deleteHoliday", async ({ _id }) => {
  const data = {
    _id: _id,
  };
  const response = await fetch(`${API_BASE_URL}/delete-holiday`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetch upcoming holiday list", error);
  }
});

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    editHolidayData: (state, action) => {
      state.editHolidayValue = action.payload;
    },
  },
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
      })
      .addCase(upcomingHolidays.pending, (state) => {
        state.loading = true;
      })
      .addCase(upcomingHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingHolidays = action.payload;
      })
      .addCase(upcomingHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something is wrong!";
      });
  },
});
export const { editHolidayData } = holidaySlice.actions;
export default holidaySlice.reducer;
