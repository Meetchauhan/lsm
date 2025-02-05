import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeave } from "../../features/leaveSlice";
import { AppDispatch, RootState } from "../../store/store";
import LeaveList from "../../components/leaveList/LeaveList";
import { getProfile } from "../../features/profileSlice";

const Leave = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLeave());
    dispatch(getProfile());
  }, [dispatch]);
  const leaves = useSelector((item: RootState) => item?.leaves?.fetchLeave);
  return leaves?.data && leaves?.data?.length > 0 ? (
    <div className="max-w-full md:max-w-[991px] lg:max-w-[1199px] xl:max-w-[1920px] mx-auto px-5 w-full py-10">
      <LeaveList />
    </div>
  ) : (
    <div className="w-full mt-10 text-center px-5">
      <h2 className="bg-white py-3">No Leave Found</h2>
    </div>
  );
};

export default Leave;
