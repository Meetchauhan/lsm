import { Button, Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/userSlice";
import { AppDispatch, RootState } from "../../../store/store";
import UserItem from "../userItem/UserItem";
import { isUpdateUser } from "../../../features/isUpdateUserSlice";
import {
  openCreateUserModal,
  openEditUserModal,
} from "../../../features/modalSlice";

interface UserList {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  availableLeave: string;
  password: string;
  leaveTaken: string | number;
}

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((item: RootState) => item?.users);
  console.log("users", users);

  const handleGetId = (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    availableLeave: string | number
  ) => {
    dispatch(
      isUpdateUser({ id, firstName, lastName, email, password, availableLeave })
    );
    dispatch(openEditUserModal());
  };

  const handleOpenCreateUserModal = () => {
    dispatch(openCreateUserModal());
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Availabe Leaves</Table.HeadCell>
            <Table.HeadCell>Leave Taken</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.data?.data?.map((item: UserList) => (
              <UserItem
                key={item?._id}
                firstName={item?.firstName}
                lastName={item?.lastName}
                email={item?.email}
                availableLeave={item?.availableLeave}
                userId={item?._id}
                password={item?.password}
                getId={handleGetId}
                leaveTaken={item?.leaveTaken}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-end mt-3 mr-3">
        <Button color="indigo" onClick={handleOpenCreateUserModal}>
          Create User
        </Button>
      </div>
    </>
  );
};
export default UserList;
