import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import modalSlice from "../features/modalSlice";
import leaveSlice from "../features/leaveSlice";
import profileSlice from "../features/profileSlice";
import registerSlice from "../features/registerSlice";
import adminAuthSlice from "../features/adminAuthSlice";
import userSlice from "../features/userSlice";
import isUpdateUserSlice from "../features/isUpdateUserSlice";
import mailSlice from "../features/mailSlice";
import paginationSlice from "../features/paginationSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    auth: authSlice,
    modal: modalSlice,
    leaves: leaveSlice,
    profile: profileSlice,
    adminAuth: adminAuthSlice,
    users: userSlice,
    isUserUpdate: isUpdateUserSlice,
    email: mailSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
