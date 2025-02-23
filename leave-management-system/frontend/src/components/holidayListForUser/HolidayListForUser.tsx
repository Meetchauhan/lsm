import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { holidayList } from "../../features/holidaySlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import HolidayItemForUser from "../holidayItemForUser/HolidayItem";

interface HolidayItemType {
  _id: string;
  holidayDate: string;
  holidayReason: string;
  status: string;
}

const HolidayListForUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const holidays = useSelector((item: RootState) => item?.holidays?.value);
  useEffect(() => {
    dispatch(holidayList());
  }, [dispatch]);
  const loading = useSelector((item: RootState) => item?.holidays?.loading);
  return (
    <>
      {loading ? (
        <SkeletonTheme>
          <Skeleton
            baseColor="#dddcdf9c"
            duration={2}
            height={40}
            highlightColor="#f2d2cb"
            count={8}
          />
        </SkeletonTheme>
      ) : (
        <div className="overflow-x-auto h-[70vh] mx-5">
          <Table
            hoverable
            className="whitespace-nowrap md:w-full"
            title="Recent Leave"
          >
            <Table.Head>
              <Table.HeadCell className="bg-white">Name</Table.HeadCell>
              <Table.HeadCell className="bg-white">Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {holidays?.data?.map((item: HolidayItemType) => (
                <HolidayItemForUser
                  key={item?._id}
                  holidayDate={item?.holidayDate}
                  holidayReason={item?.holidayReason}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};
export default HolidayListForUser;
