import { Outlet } from "react-router-dom";
import AdminHeader from "../header/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
export default AdminLayout;
