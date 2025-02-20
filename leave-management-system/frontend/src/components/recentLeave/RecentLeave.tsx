import { Table } from "flowbite-react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import LeaveItem from "../LeaveItem/LeaveItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface RecentLeave {
  _id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: string;
  leaveType: string;
}

const RecentLeave = () => {
  const leaves = useSelector((item: RootState) => item?.leaves?.fetchLeave);
  const loading = useSelector((item: RootState) => item?.leaves?.loading);

  console.log("Leaves", leaves);

  return (
    <div className="pb-5">
      <h2 className="text-2xl bg-white p-5">Recent Leave</h2>
      {loading ? (
        <SkeletonTheme>
          <Skeleton
            baseColor="#dddcdf9c"
            duration={2}
            height={40}
            highlightColor="#f2d2cb"
          />
          <Skeleton
            baseColor="#dddcdf9c"
            duration={2}
            height={40}
            highlightColor="#f2d2cb"
          />
        </SkeletonTheme>
      ) : leaves?.data?.length !== 0 ? (
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="whitespace-nowrap w-[500px] md:w-full"
            title="Recent Leave"
          >
            <Table.Head>
              <Table.HeadCell className="bg-white">Name</Table.HeadCell>
              <Table.HeadCell className="bg-white">Status</Table.HeadCell>
              <Table.HeadCell className="bg-white">Leave period</Table.HeadCell>
              <Table.HeadCell className="bg-white">
                Date of request
              </Table.HeadCell>
              <Table.HeadCell className="bg-white">Leave Type</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {leaves?.data?.map(
                (item: RecentLeave, index) =>
                  index === 0 && (
                    <LeaveItem
                      key={item?._id}
                      startDate={item?.startDate}
                      endDate={item?.endDate}
                      leaveId={item?._id}
                      leaveCreateDate={item?.createdAt}
                      status={item?.status}
                      leaveType={item?.leaveType}
                    />
                  )
              )}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <h2 className="text-center bg-white p-5">No Recent Leave Available</h2>
      )}
    </div>
  );
};
export default RecentLeave;
