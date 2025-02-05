import { Badge, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface LeaveItem {
  leaveId: string;
  startDate: string;
  endDate: string;
  leaveCreateDate: string;
  status: string;
  leaveType: string;
}

const LeaveItem = ({
  leaveId,
  startDate,
  endDate,
  leaveCreateDate,
  status,
  leaveType,
}: LeaveItem) => {
  const profile = useSelector((item: RootState) => item?.profile);
  const firstName = profile?.value?.data?.firstName;
  const lastName = profile?.value?.data?.lastName;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/leave/${leaveId}`);
  };

  return (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
      key={leaveId}
      onClick={handleNavigate}
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {`${firstName} ${lastName}`}
      </Table.Cell>
      <Table.Cell>
        <Badge
          color={`${
            status === "Canceled"
              ? "failure"
              : status === "Approved"
              ? "success"
              : "warning"
          }`}
          className="w-fit"
        >
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell>{`${startDate} - ${endDate}`}</Table.Cell>
      <Table.Cell>
        {formatDate(leaveCreateDate ? leaveCreateDate : "")}
      </Table.Cell>
      <Table.Cell>
        <Badge color="gray" className="w-fit">
          {leaveType}
        </Badge>
      </Table.Cell>
    </Table.Row>
  );
};
export default LeaveItem;
