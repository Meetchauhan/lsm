import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import UpcomingHolidayItem from "../upcomingHolidayItem/UpcomingHolidayItem";
import { useEffect } from "react";
import { upcomingHolidays } from "../../features/holidaySlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface UpcomingHolidayListItem {
  holidayReason: string;
  holidayDate: string;
}

const UpcomingHolidayList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(upcomingHolidays());
  }, [dispatch]);
  const holidayList = useSelector(
    (item: RootState) => item?.holidays?.upcomingHolidays?.data
  );
  const loading = useSelector((item: RootState) => item?.holidays?.loading);
  return (
    <div className="py-5">
      <h2 className="text-2xl bg-white p-5">Upcoming Holidays</h2>
      {loading ? (
        <SkeletonTheme>
          <Skeleton
            baseColor="#cac9db"
            duration={2}
            height={40}
            highlightColor="#f7c0b5"
          />
          <Skeleton
            baseColor="#cac9db"
            duration={2}
            height={40}
            highlightColor="#f7c0b5"
          />
        </SkeletonTheme>
      ) : (
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Holiday</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {holidayList?.map(
                (item: UpcomingHolidayListItem, index) =>
                  index < 2 && (
                    <UpcomingHolidayItem
                      key={index}
                      holiday={item?.holidayReason}
                      date={item?.holidayDate}
                    />
                  )
              )}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};
export default UpcomingHolidayList;
