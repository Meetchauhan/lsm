import { Table } from "flowbite-react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import LeaveItem from "../LeaveItem/LeaveItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface LeaveList {
  _id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: string;
  leaveType: string;
}

const LeaveList = () => {
  const leaves = useSelector((item: RootState) => item?.leaves?.fetchLeave);
  const loading = useSelector((item: RootState) => item?.leaves?.loading);
  console.log("Leaves", leaves);

  return (
    <div className="">
      <h2 className="text-2xl bg-white p-5">All Leave</h2>
      {loading ? (
        <SkeletonTheme>
          <Skeleton
            baseColor="#dddcdf9c"
            duration={2}
            height={40}
            highlightColor="#f2d2cb"
            count={2}
          />
        </SkeletonTheme>
      ) : (
        <div className="overflow-x-auto">
          <Table hoverable className="whitespace-nowrap w-[500px] md:w-full">
            <Table.Head>
              <Table.HeadCell className="bg-white">Name</Table.HeadCell>
              <Table.HeadCell className="bg-white">Status</Table.HeadCell>
              <Table.HeadCell className="bg-white">Leave period</Table.HeadCell>
              <Table.HeadCell className="bg-white">
                Date of request
              </Table.HeadCell>
              <Table.HeadCell className="bg-white">Leave Status</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {leaves?.data?.map((item: LeaveList) => (
                <LeaveItem
                  key={item?._id}
                  startDate={item?.startDate}
                  endDate={item?.endDate}
                  leaveId={item?._id}
                  leaveCreateDate={item?.createdAt}
                  status={item?.status}
                  leaveType={item?.leaveType}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};
export default LeaveList;
