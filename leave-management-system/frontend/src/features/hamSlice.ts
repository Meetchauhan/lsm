import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  showMenu: boolean;
}

const initialState: AuthState = {
  showMenu: false,
};
const hamSlice = createSlice({
  name: "hamSlice",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.showMenu = true;
    },
    closeMenu: (state) => {
      state.showMenu = false;
    },
   
  },
});

export const {
 openMenu,closeMenu
} = hamSlice.actions;

export default hamSlice.reducer;
