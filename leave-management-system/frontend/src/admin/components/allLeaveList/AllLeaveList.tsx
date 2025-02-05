import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { allLeaves } from "../../../features/leaveSlice";
import LeaveItem from "../leaveItem/LeaveItem";

interface LeaveList {
  endDate: string;
  startDate: string;
  firstName: string;
  lastName: string;
  leaveId: string;
  leaveCreatedAt: string;
  status: string;
  _id: string;
  createdAt: string;
  userId: string;
  leaveType: string;
  email: string;
}

const AllLeaveLeast = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(allLeaves({ leavePerPage: "10", page:"2" }));
  }, [dispatch]);
  const getAllLeaves = useSelector(
    (item: RootState) => item?.leaves?.allLeaves
  );
  console.log("getAllLeaves", getAllLeaves);

  return (
    <div className="overflow-x-auto lg:overflow-visible">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Leave period</Table.HeadCell>
          <Table.HeadCell>Date of request</Table.HeadCell>
          <Table.HeadCell>Leave Type</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {getAllLeaves?.data?.map((item: LeaveList) => (
            <LeaveItem
              key={item?._id}
              endDate={item?.endDate}
              startDate={item?.startDate}
              firstName={item?.firstName}
              lastName={item?.lastName}
              leaveId={item?._id}
              leaveCreatedAt={item?.createdAt}
              status={item?.status}
              userId={item?.userId}
              leaveType={item?.leaveType}
              email={item?.email}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default AllLeaveLeast;
