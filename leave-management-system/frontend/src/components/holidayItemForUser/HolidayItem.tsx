import { Table } from "flowbite-react";

interface HolidayItemForUser {
  holidayReason: string;
  holidayDate: string;
}

const HolidayItemForUser = ({ holidayDate, holidayReason }: HolidayItemForUser) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holidayReason}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holidayDate}
      </Table.Cell>
    </Table.Row>
  );
};
export default HolidayItemForUser;
