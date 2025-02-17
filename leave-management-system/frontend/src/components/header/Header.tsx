import { Button, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../features/authSlice";
import { closeMenu, openMenu } from "../../features/hamSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((item: RootState) => item?.profile?.value?.data);
  const showMenu = useSelector((item: RootState) => item?.hamburger?.showMenu);
  const handleLogout = async () => {
    await dispatch(logout());

    await navigate("/login", { replace: true });
  };
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dispatch, showMenu]);
  const handleHam = () => {
    if (showMenu) {
      dispatch(closeMenu());
      document.body.style.overflow = "auto";
    } else {
      dispatch(openMenu());
      document.body.style.overflow = "hidden";
    }
  };
  return (
    <Navbar fluid rounded className="fixed top-0 z-30 w-full">
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
      <div className="md:order-2 hidden md:flex">
        <Dropdown
          arrowIcon={false}
          label={profile?.firstName?.substring(0, 1)}
          color="indigo"
          size="sm"
        >
          <Dropdown.Item>
            <Link to="/profile">
              <span className="block text-sm">{`${profile?.firstName} ${profile?.lastName}`}</span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown>
        {/* <Navbar.Toggle /> */}
      </div>
      <Button className="md:hidden " color="indigo" onClick={handleHam}>
        {profile?.firstName?.substring(0, 1)}
      </Button>
      <Navbar.Collapse>
        <Link className=" hover:bg-slate-200 p-1 rounded-md" to="/">
          Home
        </Link>
        <Link className="hover:bg-slate-200 p-1 rounded-md" to="/leave">
          Leave
        </Link>
      </Navbar.Collapse>
      <Sidebar
        aria-label="Default sidebar example"
        className={`md:hidden absolute top-full left-0 h-[100vh] transition-all z-50 duration-100 ${
          showMenu ? "translate-x-0" : "translate-x-[-600px]"
        }`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item label="Pro" labelColor="dark">
              <Link
                className="hover:bg-slate-200 p-1 rounded-md"
                onClick={() => dispatch(closeMenu())}
                to="/"
              >
                Home
              </Link>
            </Sidebar.Item>

            <Sidebar.Item label="Pro">
              <Link
                className=" hover:bg-slate-200 p-1 rounded-md"
                onClick={() => dispatch(closeMenu())}
                to="/leave"
              >
                Leave
              </Link>
            </Sidebar.Item>
            <Sidebar.Item label="Pro">
              <Link to="/profile" onClick={() => dispatch(closeMenu())}>
                <span className="block text-sm">{`${profile?.firstName} ${profile?.lastName}`}</span>
              </Link>
            </Sidebar.Item>
            <Sidebar.Item onClick={handleLogout} className="cursor-pointer">Logout</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Navbar>
  );
};
export default Header;
