import { Button, Datepicker, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { closeEditHolidayModal } from "../../../features/modalSlice";
import { addHolidaySchema } from "../../../validationSchema/ValidationSchema";
import { editHoliday, holidayList } from "../../../features/holidaySlice";

const EditHoliday = () => {
  const dispatch = useDispatch<AppDispatch>();
  const holidayPreData = useSelector(
    (item: RootState) => item?.holidays?.editHolidayValue
  );
  const initialValue = {
    _id: holidayPreData?._id || "",
    holidayDate: holidayPreData?.holidayDate || "",
    holidayReason: holidayPreData?.holidayReason || "",
  };
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: addHolidaySchema,
      enableReinitialize: true,
      onSubmit: async (value, action) => {
        console.log("holiday added", value);
        await dispatch(editHoliday(value));
        await dispatch(holidayList());
        dispatch(closeEditHolidayModal());
        action.resetForm();
      },
    });
  const isOpenEditHolidayModal = useSelector(
    (item: RootState) => item?.modal?.editHolidayValue
  );

  return (
    <Modal show={isOpenEditHolidayModal} onClose={() => dispatch(closeEditHolidayModal())} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <Datepicker
              title="Select Holiday Date"
              onChange={(e) => e && setFieldValue("holidayDate", formatDate(e))}
              inline
              name="holidayDate"
              className="text-center"
            />
            <p className="text-red-600 text-sm text-center">
              {touched.holidayDate && errors.holidayDate}
            </p>
            <div className="py-4">
              <TextInput
                type="text"
                placeholder="Holiday"
                name="holidayReason"
                onChange={handleChange}
                value={values.holidayReason}
              />
              <p className="text-red-600 text-sm">
                {touched.holidayReason && errors.holidayReason}
              </p>
            </div>
            <Button type="submit" color="light">
              Add Holiday
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditHoliday;
