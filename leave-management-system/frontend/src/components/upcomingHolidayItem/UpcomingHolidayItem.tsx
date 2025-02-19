import { Table } from "flowbite-react";

interface UpcommingHolidayItem {
  holiday: string;
  date: string;
}

const UpcomingHolidayItem = ({ holiday, date }: UpcommingHolidayItem) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {holiday}
      </Table.Cell>
      <Table.Cell>{date}</Table.Cell>
    </Table.Row>
  );
};  

export default UpcomingHolidayItem;
