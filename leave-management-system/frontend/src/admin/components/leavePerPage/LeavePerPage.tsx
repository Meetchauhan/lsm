import { Select } from "flowbite-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { leavePerPage, pagination } from "../../../features/paginationSlice";
import { useFormik } from "formik";

interface InitialValues {
  leavePerPage: string | number;
}

const LeavePerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValue: InitialValues = {
    leavePerPage: 5,
  };

  const { values, handleChange } = useFormik({
    initialValues: initialValue,
    onSubmit: () => {},
  });
  useEffect(() => {
    dispatch(leavePerPage(values));
    dispatch(pagination({ page: 1 }));
  }, [dispatch, values]);
  return (
    <div className="flex items-center px-5 ">
      <h2 className="px-3 py-2  w-fit">Leave Per Page</h2>
      <Select
        onChange={handleChange}
        className="w-fit cursor-pointer"
        name="leavePerPage"
        id="countries"
      >
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </Select>
    </div>
  );
};
export default LeavePerPage;
