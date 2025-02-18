import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { fetchLeave } from "../../features/leaveSlice";
import CardItem from "../card/Card";
import { getProfile } from "../../features/profileSlice";
import FooterComponent from "../footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

interface LeaveData {
  generalLeave: string[];
  totalLeave: string;
  availableLeave: string;
  status: string;
  leaveTaken: string | number;
}

interface ProfileData {
  leaveTaken: string | number | undefined;
  availableLeaves: string;
}

interface RootState {
  leaves: {
    fetchLeave: {
      data: LeaveData[];
    };
  };
  profile: {
    value: {
      data: ProfileData;
    };
  };
  hamburger: {
    showMenu: boolean;
  };
}
const Layout = () => {
  const location = useLocation();
  
  const dispatch = useDispatch<AppDispatch>();
  const leaveData = useSelector(
    (item: RootState) => item?.leaves?.fetchLeave?.data
  );
  console.log(
    "leaveData",
    leaveData?.map((item) => item)
  );
  const profile = useSelector((item: RootState) => item?.profile?.value?.data);
  console.log("profile", profile);
  const showMenu = useSelector((item: RootState) => item?.hamburger?.showMenu);

  useEffect(() => {
    dispatch(getProfile())
      // .then(() => dispatch(authNavigation()))
      .then(() => dispatch(fetchLeave()))
      .then(() => dispatch(getProfile()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLeave()).then(() => dispatch(getProfile()));
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="bg-slate-100 relative pt-16">
        {showMenu && (
          <div className="absolute w-[100vw] h-[100%] backdrop-brightness-50 z-10"></div>
        )}
        {location?.pathname !== "/holiday-list" && profile !== undefined && (
          <div className="flex flex-col sm:flex-row pt-5 gap-0 sm:gap-5 px-10">
            <CardItem
              heading="Available Leave"
              leave={profile?.availableLeaves}
            />
            <CardItem heading="Leave Taken" leave={profile?.leaveTaken} />
          </div>
        )}
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};
export default Layout;
