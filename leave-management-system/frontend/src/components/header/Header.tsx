import { Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((item: RootState) => item?.profile?.value?.data);
  const handleLogout = async () => {
    await dispatch(logout());

    await navigate("/login", { replace: true });
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <Link to={"/"} className="flex">
          <img
            src="/vite.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LMS
          </span>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          // inline
          label={
            // <Avatar
            //   alt="User settings"
            //   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            //   rounded
            // />
            profile?.firstName?.substring(0, 1)
          }
          color="indigo"
          size="sm"
          
        >
          <Dropdown.Item>
            <Link to="/profile">
              <span className="block text-sm">{`${profile?.firstName} ${profile?.lastName}`}</span>
              {/* <span className="block truncate text-sm font-medium">
                {profile?.email}
              </span> */}
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link className=" hover:bg-slate-200 p-1 rounded-md" to="/">
          Home
        </Link>
        <Link className="hover:bg-slate-200 p-1 rounded-md" to="/leave">
          Leave
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
