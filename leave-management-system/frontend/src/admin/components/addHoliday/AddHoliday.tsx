import { Button, Datepicker, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { closeAddHolidayModal } from "../../../features/modalSlice";
import { addHolidaySchema } from "../../../validationSchema/ValidationSchema";
import { addHoliday, holidayList } from "../../../features/holidaySlice";

const AddHoliday = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValue = {
    holidayDate: "",
    holidayReason: "",
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
      onSubmit: async (value, action) => {
        console.log("holiday added", value);
        await dispatch(addHoliday(value));
        await dispatch(holidayList());
        dispatch(closeAddHolidayModal());
        action.resetForm();
      },
    });
  const isOpenAddHolidayModal = useSelector(
    (item: RootState) => item?.modal?.addHolidayValue
  );

  return (
    <Modal
      show={isOpenAddHolidayModal}
      onClose={() => dispatch(closeAddHolidayModal())}
      popup
    >
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

export default AddHoliday;
