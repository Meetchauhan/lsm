import { Table } from "flowbite-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteHoliday, holidayList } from "../../../features/holidaySlice";
import { HiDocumentRemove } from "react-icons/hi";
import { openEditHolidayModal } from "../../../features/modalSlice";

interface HolidayItem {
  holidayReason: string;
  holidayDate: string;
  _id: string;
  getEditHoliday: (_id: string, holiday: string, date: string) => void;
}

const HolidayItem = ({
  _id,
  holidayDate,
  holidayReason,
  getEditHoliday,
}: HolidayItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleHolidayDelete = () => {
    dispatch(deleteHoliday({ _id })).then(() => dispatch(holidayList()));
  };
  const handleEditHoliday = () => {
    getEditHoliday(_id, holidayDate, holidayReason );
    dispatch(openEditHolidayModal());
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holidayReason}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holidayDate}
      </Table.Cell>
      <Table.Cell
        onClick={() => handleEditHoliday()}
        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
      >
        Edit
      </Table.Cell>
      <Table.Cell
        onClick={handleHolidayDelete}
        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
      >
        <HiDocumentRemove
          onClick={handleHolidayDelete}
          color="red"
          className="size-5 cursor-pointer"
        />
      </Table.Cell>
    </Table.Row>
  );
};
export default HolidayItem;
