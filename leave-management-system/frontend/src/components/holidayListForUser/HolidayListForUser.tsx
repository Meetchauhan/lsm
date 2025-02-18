import {  Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { holidayList } from "../../features/holidaySlice";
import HolidayItem from "../../admin/components/holidayItem/HolidayItem";

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
  return (
    <>
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
              <HolidayItem
                key={item?._id}
                date={item?.holidayDate}
                holiday={item?.holidayReason}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
export default HolidayListForUser;
