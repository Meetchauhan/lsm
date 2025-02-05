
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { closeEditUserModal } from "../../../../features/modalSlice";
import { useFormik } from "formik";
import { isUserUpdateSchema } from "../../../../validationSchema/ValidationSchema";
import { editUserAdmin, getUsers } from "../../../../features/userSlice";

export default function EditUser() {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((item: RootState) => item?.modal?.editUserValue);

  const userData = useSelector((item: RootState) => item?.isUserUpdate?.value);

  function onCloseModal() {
    dispatch(closeEditUserModal());
  }

  console.log("update userData", userData);

  const initialValue = {
    _id: userData?.id || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    password: userData?.password || "",
    availableLeave:userData?.availableLeave || ""
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: isUserUpdateSchema,
    onSubmit: async (value, action) => {
      console.log("edited value", value);
      await dispatch(editUserAdmin(value));
      await dispatch(getUsers());
      onCloseModal();
      action.resetForm();
    },
  });

  console.log("is user update value", values);

  return (
    <>
      <Modal show={modal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white">
                Edit
              </h3>
              <div>
                <TextInput
                  value={values._id}
                  onChange={handleChange}
                  name="_id"
                  type="hidden"
                />
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
                <p className="text-sm text-red-600">
                  {touched.firstName && errors.firstName}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
                <p className="text-sm text-red-600">
                  {touched.lastName && errors.lastName}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  placeholder="name@company.com"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                />
                <p className="text-sm text-red-600">
                  {touched.email && errors.email}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <p className="text-sm text-red-600">
                  {touched.password && errors.password}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="availableLeave" value="Available Leave" />
                </div>
                <TextInput
                  name="availableLeave"
                  type="text"
                  value={values.availableLeave}
                  onChange={handleChange}
                />
                <p className="text-sm text-red-600">
                  {touched.availableLeave && errors.availableLeave}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <Button className="" type="submit">
                  {"Update"}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
