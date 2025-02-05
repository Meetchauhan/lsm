import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { allLeaves } from "../../../features/leaveSlice";
import { Badge, Table } from "flowbite-react";
// import { getProfile } from "../../features/profileSlice";
// import {
//   closeCancelLeaveModal,
//   openCancelLeaveModal,
// } from "../../features/modalSlice";
// import CancelLeave from "../../components/modals/cancelLeaveModal/CancelLeave";

interface Leave {
  _id: string;
  createdAt: string;
  allDates: [];
  generalLeave: [];
  reason: string;
  userId: string;
  status: string;
  leaveType: string;
  // other fields...
}

interface AllLeaveState {
  data: Leave[];
  // other fields...
}

interface LeavesState {
  allLeaves: AllLeaveState;
  // other fields...
}

interface RootStates {
  leaves: LeavesState;
  // other fields...
}

const AdminLeaveDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const leaveData = useSelector(
    (item: RootStates) =>
      item?.leaves?.allLeaves?.data?.find((leaveId) => leaveId?._id === id) ??
      null
  );

  //   const cancelLeaveModal = useSelector(
  //     (state: RootState) => state?.modal?.value
  //   );

  useEffect(() => {
    dispatch(allLeaves({ leavePerPage: 5, page: 1 }));
  }, [dispatch]);

  console.log("leave detail", leaveData);
  console.log("leave id", id);

  //   const handleLeaveStatus = () => {
  //     dispatch(
  //       leaveStatus({
  //         leaveId: leaveData?._id || "",
  //         status: "Canceled",
  //         userId: leaveData?.userId || "",
  //       })
  //     )
  //       .then(() => dispatch(fetchLeave()))
  //       .then(() => dispatch(getProfile()))
  //       .then(() => dispatch(closeCancelLeaveModal()));
  //   };

  return (
    <div className="overflow-x-auto max-w-full md:max-w-[991px] lg:max-w-[1199px] xl:max-w-[1920px] mx-auto px-5 w-full py-10">
      <Table className="whitespace-nowrap w-[500px] md:w-full">
        <Table.Head></Table.Head>
        <Table.Body className="divide-y ">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {"Leave Created at"}
            </Table.Cell>
            <Table.Cell>{leaveData?.createdAt}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              All leave Dates
            </Table.Cell>
            <Table.Cell>
              {leaveData?.allDates?.map((item, index) => (
                <span key={index}>
                  {index !== 0 && " | "} {item}
                </span>
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Leave Dates
            </Table.Cell>
            <Table.Cell>
              {leaveData?.generalLeave?.map((item, index) => (
                <span key={index}>
                  {index !== 0 && " | "} {item}
                </span>
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              All Leave Days Count
            </Table.Cell>
            <Table.Cell>{leaveData?.allDates?.length}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Leave Days Count
            </Table.Cell>
            <Table.Cell>{leaveData?.generalLeave?.length}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Leave Reason
            </Table.Cell>
            <Table.Cell>{leaveData?.reason}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Leave Type
            </Table.Cell>
            <Table.Cell>
              <Badge color="gray" className="w-fit">
                {leaveData?.leaveType}
              </Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Leave Status
            </Table.Cell>
            <Table.Cell>
              <Badge
                color={`${
                  leaveData?.status === "Canceled"
                    ? "failure"
                    : leaveData?.status === "Approved"
                    ? "success"
                    : "warning"
                }`}
                className="w-fit"
              >
                {leaveData?.status}
              </Badge>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
export default AdminLeaveDetail;
