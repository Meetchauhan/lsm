import { createSlice } from "@reduxjs/toolkit";

interface InitialStateValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id:string
  availableLeave:number
}

interface InitialStateType {
  value: InitialStateValue | null;
}

const initialState: InitialStateType = {
  value: null,
};

const isUpdateUserSlice = createSlice({
  name: "hasUpdateUser",
  initialState,
  reducers: {
    isUpdateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { isUpdateUser } = isUpdateUserSlice.actions;
export default isUpdateUserSlice.reducer;
