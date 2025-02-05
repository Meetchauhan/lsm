import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const AdminLoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const AdminRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LeaveRequestValidation = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  reason: Yup.string().required("Leave reason is required"),
});

export const isUserUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});