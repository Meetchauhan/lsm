import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchLeave, leaveStatus, leaveTaken } from "../../features/leaveSlice";
import { Badge, Button, Table } from "flowbite-react";
import { getProfile } from "../../features/profileSlice";
import {
  closeCancelLeaveModal,
  openCancelLeaveModal,
} from "../../features/modalSlice";
import CancelLeave from "../../components/modals/cancelLeaveModal/CancelLeave";
import { leaveCanceledMail } from "../../features/mailSlice";

interface Leave {
  _id: string;
  createdAt: string;
  allDates: [];
  generalLeave: [];
  reason: string;
  userId: string;
  status: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  email: string;
  // other fields...
}

interface FetchLeaveState {
  data: Leave[];
  // other fields...
}

interface LeavesState {
  fetchLeave: FetchLeaveState;
  // other fields...
}

interface RootStates {
  leaves: LeavesState;
  // other fields...
}

const LeaveDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const leaveData = useSelector(
    (item: RootStates) =>
      item?.leaves?.fetchLeave?.data?.find((leaveId) => leaveId?._id === id) ??
      null
  );

  const cancelLeaveModal = useSelector(
    (state: RootState) => state?.modal?.cancelLeaveValue
  );

  useEffect(() => {
    dispatch(fetchLeave());
    dispatch(getProfile());
  }, [dispatch]);

  console.log("leave detail", leaveData);
  console.log("leave id", id);

  const handleLeaveStatus = () => {
    dispatch(
      leaveStatus({
        leaveId: leaveData?._id || "",
        status: "Canceled",
        userId: leaveData?.userId || "",
      })
    )
      .then(() =>
        dispatch(
          leaveCanceledMail({
            startDate: leaveData?.startDate || "",
            endDate: leaveData?.endDate || "",
            leaveType: leaveData?.leaveType || "",
            email: leaveData?.email || "",
          })
        )
      )
      .then(() => dispatch(fetchLeave()))
      .then(() => dispatch(leaveTaken()))
      .then(() => dispatch(getProfile()))
      .then(() => dispatch(closeCancelLeaveModal()));
  };

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
      <Button
        className="py-0 ml-auto mt-5"
        color="red"
        onClick={() => dispatch(openCancelLeaveModal())}
        disabled={
          leaveData?.status === "Canceled" || leaveData?.status === "Approved"
        }
      >
        Cancel Leave
      </Button>
      <CancelLeave
        openModal={cancelLeaveModal}
        submitModal={handleLeaveStatus}
      />
    </div>
  );
};
export default LeaveDetail;
