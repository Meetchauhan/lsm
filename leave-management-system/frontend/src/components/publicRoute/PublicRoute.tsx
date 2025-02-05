import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../../store/store";

interface PublicRouteProps {
  children: ReactNode; // Define the type for children
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { pathname } = useLocation();

  const isAuth = useSelector(
    (state: RootState) => state?.auth?.navigation?.success
  );

  const isAdminAuth = useSelector(
    (state: RootState) => state?.adminAuth?.adminNavigation?.success
  );

  console.log("admin auth", isAdminAuth);

  console.log("pathname", pathname);

  const storedAuth = JSON.parse(
    localStorage.getItem("auth") || "null"
  )?.success;

  const storedAdminAuth = JSON.parse(
    localStorage.getItem("admin-auth") || "null"
  )?.success;
  // const loading = useSelector((state: RootState) => state?.auth?.loading);
  console.log("is Auth", isAuth);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loader while authentication state is being determined
  // }

  // If not authenticated, redirect to the login page
  return isAuth || storedAuth ? (
    <Navigate to="/" />
  ) : isAdminAuth || storedAdminAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;
