import { useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  children: ReactNode; // Define the type for children
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const isAuth = useSelector(
    (state: RootState) => state?.auth?.navigation?.success
  );

  // const isAdminAuth = useSelector(
  //   (state: RootState) => state?.adminAuth?.adminNavigation?.success
  // );

  const isUser = JSON.parse(localStorage.getItem("auth") || "null");
  const isAdmin = JSON.parse(localStorage.getItem("admin-auth") || "null");
  const { pathname } = useLocation();

  console.log("isUser", isUser);
  console.log("isAdmin", isAdmin);

  const currentRole =
    isAuth || isUser?.success
      ? "user"
      : isAdmin || isAdmin?.success
      ? "admin"
      : null;

  const allowedRoutesForRoles = {
    user: ["/", "/leave", "/leave/:leaveId", "/profile"],
    admin: ["/dashboard", "/users", "/dashboard/:leaveId"],
  };

  const isRouteAllowed = (routeList: string[], path: string) => {
    return routeList.some((route: string) => {
      const routePattern = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
      return routePattern.test(path);
    });
  };

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoutes = allowedRoutesForRoles[currentRole];
  if (!isRouteAllowed(allowedRoutes, pathname)) {
    const defaultRoute = currentRole === "admin" ? "/dashboard" : "/";
    return <Navigate to={defaultRoute} replace />;
  }

  // const isAuth = useSelector(
  //   (state: RootState) => state?.auth?.navigation?.success
  // );
  // console.log("pathname", pathname);

  // const storedAuth = JSON.parse(
  //   localStorage.getItem("auth") || "null"
  // )?.success;

  // const loading = useSelector((state: RootState) => state?.auth?.loading);
  // console.log("is Auth", isAuth);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loader while authentication state is being determined
  // }

  return children;
};

export default ProtectedRoute;
