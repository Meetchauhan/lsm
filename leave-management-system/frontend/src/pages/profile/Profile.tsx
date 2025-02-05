import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/profileSlice";
import { AppDispatch, RootState } from "../../store/store";
import { isUserUpdateSchema } from "../../validationSchema/ValidationSchema";
import { useFormik } from "formik";
import { editUser } from "../../features/userSlice";
import {
  closeEditUserModal,
  openEditUserModal,
} from "../../features/modalSlice";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(
    (item: RootState) => item?.profile?.value?.data
  );
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const modal = useSelector((item: RootState) => item?.modal?.editUserValue);

  function onCloseModal() {
    dispatch(closeEditUserModal());
  }

  const initialValue = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    password: userProfile?.password || "",
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: isUserUpdateSchema,
    onSubmit: async (value, action) => {
      console.log("edited value", value);
      await dispatch(editUser(value));
      await dispatch(getProfile());
      onCloseModal();
      action.resetForm();
    },
  });

  return (
    <>
      <div className="overflow-x-auto px-5 sm:px-10">
        <Table>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Name
              </Table.Cell>
              <Table.Cell>
                {userProfile?.firstName} {userProfile?.lastName}
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Email
              </Table.Cell>
              <Table.Cell>{userProfile?.email}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Password
              </Table.Cell>
              <Table.Cell>{userProfile?.password}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div className="flex justify-end my-5">
          <Button color="light" onClick={() => dispatch(openEditUserModal())}>
            Edit Profile
          </Button>
        </div>
      </div>
      <Modal show={modal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white">
                Edit
              </h3>
              <div>
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
                  {touched.password && touched.password}
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
