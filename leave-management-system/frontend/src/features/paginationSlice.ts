import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  page: number | string;
  leavePerPage: number | string;
}

const initialState: InitialState = {
  page: 1,
  leavePerPage: 5,
};
const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialState,
  reducers: {
    pagination: (state, action) => {
      state.page = action.payload?.page ?? action?.payload;
    },
    leavePerPage: (state, action) => {
      state.leavePerPage = action.payload?.leavePerPage ?? action?.payload;
    },
  },
});
export const { pagination, leavePerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
