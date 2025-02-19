import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  closeNewLeaveModal,
  openNewLeaveModal,
} from "../../features/modalSlice";
import LeaveRequestModel from "../../components/modals/leaveRequestModel/LeaveRequestModel";
import RecentLeave from "../../components/recentLeave/RecentLeave";
import { getProfile } from "../../features/profileSlice";
import UpcomingHolidayList from "../../components/upcomingHolidayList/UpcomingHolidayList";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state?.modal?.newLeaveValue);
  console.log("modal", modal);

  const handleCloseModel = () => {
    dispatch(closeNewLeaveModal());
    dispatch(getProfile());
  };

  return (
    <div className=" relative home max-w-full md:max-w-[991px] lg:max-w-[1199px] xl:max-w-[1920px] mx-auto px-5 w-full py-5">
      <UpcomingHolidayList />
      <RecentLeave />
      <div className="flex justify-end" color="">
        <Button color="teal" onClick={() => dispatch(openNewLeaveModal())}>
          Leave Request
        </Button>
      </div>
      <LeaveRequestModel
        openModal={modal}
        handleCloseModel={handleCloseModel}
      />
    </div>
  );
};
export default Home;
