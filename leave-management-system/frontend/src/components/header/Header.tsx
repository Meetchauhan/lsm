import { Button, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../features/authSlice";
import { closeMenu, openMenu } from "../../features/hamSlice";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { HiX } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((item: RootState) => item?.profile?.value?.data);
  const showMenu = useSelector((item: RootState) => item?.hamburger?.showMenu);
  const loading = useSelector((item: RootState) => item?.profile?.loading);
  console.log("show menu", showMenu);

  const handleLogout = async () => {
    await dispatch(logout());
    await navigate("/login", { replace: true });
    dispatch(closeMenu());
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
    <header className="">
      <Navbar fluid rounded className="fixed top-0 z-30 w-full">
        <Navbar.Brand>
          <Link to={"/"} className="flex">
            <img
              src="/lsmLogo.png"
              className="mr-3 w-16"
              alt="Flowbite React Logo"
            />
          </Link>
        </Navbar.Brand>

        <div className="md:order-2 hidden md:flex">
          {loading ? (
            <Skeleton
              baseColor="#cac9db"
              duration={1}
              height={40}
              width={40}
              highlightColor="#f7c0b5"
            />
          ) : (
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
          )}
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
          <Link
            className="hover:bg-slate-200 p-1 rounded-md"
            to="/holiday-list"
          >
            Holidays
          </Link>
        </Navbar.Collapse>
        <Sidebar
          aria-label="Default sidebar example"
          className={`md:hidden absolute top-full left-0 h-[100vh] transition-all z-50 duration-100 ${
            showMenu ? "translate-x-0" : "translate-x-[-600px]"
          }`}
        >
          <Sidebar.Items>
            <div className="flex justify-end">
              <Button
                onClick={() => dispatch(closeMenu())}
                color="gray"
                className="text-right"
              >
                <HiX className="h-4 w-4" />
              </Button>
            </div>
            <Sidebar.ItemGroup>
              <Sidebar.Item className="border-b-2 hover:bg-slate-200 transition-all duration-300">
                <Link
                  className="p-1 rounded-md w-full"
                  onClick={() => dispatch(closeMenu())}
                  to="/"
                >
                  Home
                </Link>
              </Sidebar.Item>

              <Sidebar.Item className="border-b-2 hover:bg-slate-200 transition-all duration-300">
                <Link
                  className=" hover:bg-slate-200 p-1 rounded-md"
                  onClick={() => dispatch(closeMenu())}
                  to="/leave"
                >
                  Leave
                </Link>
              </Sidebar.Item>
              <Sidebar.Item className="border-b-2 hover:bg-slate-200 transition-all duration-300">
                <Link
                  className=" hover:bg-slate-200 p-1 rounded-md"
                  onClick={() => dispatch(closeMenu())}
                  to="/holiday-list"
                >
                  Holidays
                </Link>
              </Sidebar.Item>
              <Sidebar.Item className="border-b-2 hover:bg-slate-200 transition-all duration-300">
                <Link to="/profile" onClick={() => dispatch(closeMenu())}>
                  Profile
                </Link>
              </Sidebar.Item>
              <Sidebar.Item
                onClick={handleLogout}
                className="border-b-2 cursor-pointer hover:bg-slate-200 transition-all duration-300"
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Navbar>
    </header>
  );
};
export default Header;
