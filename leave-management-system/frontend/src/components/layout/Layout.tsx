import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { fetchLeave } from "../../features/leaveSlice";
import CardItem from "../card/Card";
import { getProfile } from "../../features/profileSlice";
import FooterComponent from "../footer/Footer";
import { Outlet } from "react-router-dom";

interface LeaveData {
  generalLeave: string[];
  totalLeave: string;
  availableLeave: string;
  status: string;
  leaveTaken:string | number
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
}
const Layout = () => {
  // const [leaveTaken, setLeaveTaken] = useState<number>();
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
  // const generalLeaveLengths = leaveData?.map((entry) => ({
  //   leaveStatus: entry.status,
  //   generalLeaveLength: entry.generalLeave.length,
  // }));
  // useEffect(() => {
  //   setLeaveTaken(() => {
  //     const leaveTaken = generalLeaveLengths
  //       ?.filter((item) => item?.leaveStatus !== "Canceled")
  //       ?.reduce(
  //         (initialValue, item) => initialValue + item?.generalLeaveLength,
  //         0
  //       );
  //     return leaveTaken;
  //   });
  // }, [leaveTaken, generalLeaveLengths]);

  // console.log("leave taken", leaveTaken);

  // console.log("general leave length", generalLeaveLengths);

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
      <main className="bg-slate-100 py-5">
        {profile !== undefined && (
          <div className="flex flex-col sm:flex-row pt-5 gap-5 px-10">
            {/* <CardItem
              heading="Total Leave"
              leave={leaveData?.totalLeave ?? "24"}
            /> */}
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
