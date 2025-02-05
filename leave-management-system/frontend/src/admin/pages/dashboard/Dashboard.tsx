import AllLeaveLeast from "../../components/allLeaveList/AllLeaveList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allLeaves } from "../../../features/leaveSlice";
import { AppDispatch, RootState } from "../../../store/store";
import Pagination from "../../components/pagination/Pagination";
import LeavePerPage from "../../components/leavePerPage/LeavePerPage";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector((item: RootState) => item?.pagination?.page);
  const leavePerPageData = useSelector(
    (item: RootState) => item?.pagination?.leavePerPage
  );

  useEffect(() => {
    dispatch(allLeaves({ leavePerPage: leavePerPageData, page: currentPage }));
  }, [dispatch, currentPage, leavePerPageData]);

  return (
    <div className="pb-10">
      <LeavePerPage />
      <div className="max-w-full md:max-w-[1199px] xl:max-w-[1920px] mx-auto px-5 w-full py-10">
        <AllLeaveLeast />
      </div>
      <Pagination />
    </div>
  );
};
export default Dashboard;
