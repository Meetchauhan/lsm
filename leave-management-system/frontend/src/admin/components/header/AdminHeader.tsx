import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAdminProfile } from "../../../features/profileSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { adminLogout } from "../../../features/adminAuthSlice";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  const profile = useSelector((item: RootState) => item?.profile?.value?.data);

  const handleLogout = () => {
    dispatch(adminLogout());

    navigate("/admin", { replace: true });
  };

  return (
    <header>
      <Navbar fluid rounded>
        <Link to="/dashboard">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LMS
          </span>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to={"/dashboard"}>Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/holidays">Holidays</Link>
        </Navbar.Collapse>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{`${profile?.firstName} ${profile?.lastName}`}</span>
              <span className="block truncate text-sm font-medium">
                {profile?.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </header>
  );
};
export default AdminHeader;
