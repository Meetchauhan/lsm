import { Badge, Dropdown, Table } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allLeaves,
  leaveStatus,
  leaveTaken,
} from "../../../features/leaveSlice";
import { AppDispatch } from "../../../store/store";
import {
  leaveApprovedMail,
  leaveCanceledMail,
} from "../../../features/mailSlice";

interface LeaveItem {
  firstName: string;
  lastName: string;
  status: string;
  startDate: string;
  endDate: string;
  leaveCreatedAt: string;
  leaveId: string;
  userId: string;
  leaveType: string;
  email: string;
}

const LeaveItem = ({
  firstName,
  lastName,
  email,
  status,
  startDate,
  endDate,
  leaveCreatedAt,
  leaveId,
  userId,
  leaveType,
}: LeaveItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/dashboard/${leaveId}`);
  };
  const handleStatus = (status: string) => {
    dispatch(leaveStatus({ userId: userId, leaveId: leaveId, status: status }))
      .then(() => dispatch(allLeaves({ leavePerPage: 5, page: 1 })))
      .then(() => dispatch(leaveTaken()));
    if (status === "Approved") {
      dispatch(
        leaveApprovedMail({
          startDate: startDate,
          endDate: endDate,
          leaveType: leaveType,
          email: email,
        })
      );
    }
    if (status === "Canceled") {
      dispatch(
        leaveCanceledMail({
          startDate: startDate,
          endDate: endDate,
          leaveType: leaveType,
          email: email,
        })
      );
    }
  };
  return (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
      key={leaveId}
    >
      <Table.Cell
        onClick={handleNavigate}
        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
      >
        {`${firstName} ${lastName}`}
      </Table.Cell>
      <Table.Cell onClick={handleNavigate}>
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
      <Table.Cell
        onClick={handleNavigate}
      >{`${startDate} - ${endDate}`}</Table.Cell>
      <Table.Cell onClick={handleNavigate}>{leaveCreatedAt}</Table.Cell>
      <Table.Cell onClick={handleNavigate}>{leaveType}</Table.Cell>
      <Table.Cell>
        <Dropdown
          label={status}
          value={"Test"}
          // inline
          disabled={status === "Canceled"}
          color={
            status === "Canceled"
              ? `red`
              : status === "Approved"
              ? "green"
              : "yellow"
          }
          className="text-black text-lg"
        >
          <Dropdown.Item
            value={"Pending"}
            onClick={() => handleStatus("Pending")}
          >
            Pending
          </Dropdown.Item>
          <Dropdown.Item
            value={"Approved"}
            onClick={() => handleStatus("Approved")}
          >
            Approve
          </Dropdown.Item>
          <Dropdown.Item
            value={"Canceled"}
            onClick={() => handleStatus("Canceled")}
          >
            Cancel
          </Dropdown.Item>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
};

export default LeaveItem;
