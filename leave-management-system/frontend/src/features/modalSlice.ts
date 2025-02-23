import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  newLeaveValue: boolean;
  cancelLeaveValue: boolean;
  editUserValue: boolean;
  createUserValue: boolean;
  addHolidayValue: boolean;
  editHolidayValue: boolean;
}

const initialState: AuthState = {
  newLeaveValue: false,
  cancelLeaveValue: false,
  editUserValue: false,
  createUserValue: false,
  addHolidayValue: false,
  editHolidayValue: false,
};
const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openNewLeaveModal: (state) => {
      state.newLeaveValue = true;
    },
    closeNewLeaveModal: (state) => {
      state.newLeaveValue = false;
    },
    openCancelLeaveModal: (state) => {
      state.cancelLeaveValue = true;
    },
    closeCancelLeaveModal: (state) => {
      state.cancelLeaveValue = false;
    },
    openEditUserModal: (state) => {
      state.editUserValue = true;
    },
    closeEditUserModal: (state) => {
      state.editUserValue = false;
    },
    openCreateUserModal: (state) => {
      state.createUserValue = true;
    },
    closeCreateUserModal: (state) => {
      state.createUserValue = false;
    },
    openAddHolidayModal: (state) => {
      state.addHolidayValue = true;
    },
    closeAddHolidayModal: (state) => {
      state.addHolidayValue = false;
    },
    openEditHolidayModal: (state) => {
      state.editHolidayValue = true;
    },
    closeEditHolidayModal: (state) => {
      state.editHolidayValue = false;
    },
  },
});

export const {
  openNewLeaveModal,
  closeNewLeaveModal,
  openCancelLeaveModal,
  closeCancelLeaveModal,
  openEditUserModal,
  closeEditUserModal,
  openCreateUserModal,
  closeCreateUserModal,
  openAddHolidayModal,
  closeAddHolidayModal,
  openEditHolidayModal,
  closeEditHolidayModal,
} = modalSlice.actions;

export default modalSlice.reducer;
