import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Leave from "./pages/leave/Leave";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// import PublicRoute from "./components/publicRoute/PublicRoute";
import LeaveDetail from "./pages/leaveDetail/LeaveDetail";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import AdminRegister from "./admin/pages/register/AdminRegister";
import AdminLogin from "./admin/pages/login/AdminLogin";
import AdminLayout from "./admin/components/adminLayout/AdminLayout";
import Users from "./admin/pages/users/Users";
import AdminLeaveDetail from "./admin/pages/leaveDetail/AdminLeaveDetail";
import Profile from "./pages/profile/Profile";
import Holidays from "./admin/pages/holidays/Holidays";
import HolidayListPage from "./pages/holidayListPage/HolidayListPage";

function App() {
  return (
    // <Layout>
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/leave/:id" element={<LeaveDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/holiday-list" element={<HolidayListPage />} />
      </Route>

      <Route
        path="/login"
        element={
          // <PublicRoute>
          <Login />
          // </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          // <PublicRoute>
          <Register />
          // </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard/:id" element={<AdminLeaveDetail />} />
        <Route path="/holidays" element={<Holidays />} />
      </Route>
      <Route
        path="/admin-register"
        element={
          // <PublicRoute>
          <AdminRegister />
          // </PublicRoute>
        }
      />
      <Route
        path="/admin"
        element={
          // <PublicRoute>
          <AdminLogin />
          // </PublicRoute>
        }
      />
    </Routes>
    // </Layout>
  );
}

export default App;
