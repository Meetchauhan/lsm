import { Table } from "flowbite-react";

interface HolidayItem {
  holiday: string;
  date: string;
}

const HolidayItem = ({ holiday, date}: HolidayItem) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holiday}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {date}
      </Table.Cell>
    </Table.Row>
  );
};
export default HolidayItem;
