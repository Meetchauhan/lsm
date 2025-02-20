import {
  Button,
  Datepicker,
  Dropdown,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchLeave,
  leaveRequest,
  leaveTaken,
} from "../../../features/leaveSlice";
import { getProfile } from "../../../features/profileSlice";
import { LeaveRequestValidation } from "../../../validationSchema/ValidationSchema";
import { leaveRequestMail } from "../../../features/mailSlice";
interface LeaveRequestModelProps {
  openModal: boolean;
  handleCloseModel: () => void;
}
const LeaveRequestModel: React.FC<LeaveRequestModelProps> = ({
  openModal,
  handleCloseModel,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentDate = new Date();
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getAllDatesInRange = (start: Date, end: Date): string[] => {
    const dateList = [];
    const current = new Date(start);
    while (current <= end) {
      dateList.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    return dateList;
  };

  const handleEndDateChange = (e: Date | null) => {
    if (values.startDate && e) {
      // const start = new Date(values.startDate);
      const end = e;
      setFieldValue("endDate", formatDate(end));
      // const datesInRange = getAllDatesInRange(start, end);
      // console.log("All Dates in Range:", datesInRange);
    }
  };
  const userData = useSelector((item: RootState) => item?.profile?.value?.data);
  const initialValue = {
    startDate: "",
    endDate: "",
    email: userData?.email,
    leaveType: "",
    reason: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: LeaveRequestValidation,
      onSubmit: async (value) => {
        const start = new Date(value.startDate);
        const end = new Date(value.endDate);
        const allDatesInRange = getAllDatesInRange(start, end);
        console.log("all dates", allDatesInRange);
        await dispatch(
          leaveRequest({
            startDate: value.startDate,
            endDate: value.endDate,
            allDates: allDatesInRange,
            email: userData?.email || "",
            reason: value.reason,
            leaveType: value.leaveType,
          })
        );
        handleCloseModel();
        await dispatch(fetchLeave());
        await dispatch(getProfile());
        await dispatch(leaveTaken());
        await dispatch(
          leaveRequestMail({
            startDate: value.startDate,
            endDate: value.endDate,
            email: userData?.email || "",
            reason: value.reason,
            leaveType: value.leaveType,
            firstName: userData?.firstName || "",
            lastName: userData?.lastName || "",
          })
        );  

      },
    });
  console.log("leave request value", values);

  return (
    <Modal show={openModal} size="6xl" onClose={handleCloseModel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Leave
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="mb-1 block">
                <Label
                  htmlFor="startDate"
                  value="Select Date"
                  className="text-md"
                />
              </div>
              <div className="flex items-center flex-col w-full sm:flex-row">
                <div className="w-full">
                  <Datepicker
                    title="Select Start Date"
                    onChange={(e) =>
                      e && setFieldValue("startDate", formatDate(e))
                    }
                    minDate={currentDate}
                    name="startDate"
                  />
                  <p className="text-red-600 text-sm h-1">
                    {touched.startDate && errors.startDate}
                  </p>
                </div>
                <p className="py-3 sm:px-5 py:0">To</p>
                <div className="w-full">
                  <Datepicker
                    title="Select End Date"
                    onChange={(e) => handleEndDateChange(e)}
                    minDate={new Date(values?.startDate)}
                    name="endDate"
                  />
                  <p className="text-red-600 text-sm h-1">
                    {touched.endDate && errors.endDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-1 block">
                <Label htmlFor="email" value="Your email" className="text-md" />
              </div>
              <TextInput
                id="email"
                value={userData?.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <div className="mb-1 block">
                <Label
                  htmlFor="reason"
                  value="Select Leave Type"
                  className="text-md"
                />
              </div>

              <Dropdown
                label={values.leaveType || "Select Leave Type"}
                name="leaveType"
                className="text-black text-lg"
                color="gray"
              >
                <Dropdown.Item
                  value={"Pending"}
                  onClick={() => setFieldValue("leaveType", "General Leave")}
                >
                  General Leave
                </Dropdown.Item>
                <Dropdown.Item
                  value={"Approved"}
                  onClick={() => setFieldValue("leaveType", "Sick Leave")}
                >
                  Sick Leave
                </Dropdown.Item>
                <Dropdown.Item
                  value={"Canceled"}
                  onClick={() => setFieldValue("leaveType", "Marriage Leave")}
                >
                  Marriage Leave
                </Dropdown.Item>
              </Dropdown>

              <p className="text-red-600 text-sm h-1">
                {touched.reason && errors.reason}
              </p>
            </div>
            <div className="mb-5">
              <div className="mb-1 block">
                <Label
                  htmlFor="reason"
                  value="Reason for leave"
                  className="text-md"
                />
              </div>
              <Textarea id="reason" name="reason" onChange={handleChange} />
              <p className="text-red-600 text-sm h-1">
                {touched.reason && errors.reason}
              </p>
            </div>

            <div className="w-full">
              <Button type="submit">{"Submit"}</Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default LeaveRequestModel;
