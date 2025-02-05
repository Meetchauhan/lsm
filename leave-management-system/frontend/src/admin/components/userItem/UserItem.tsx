import { Table } from "flowbite-react";
import { HiOutlineUserRemove } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteUser, getUsers } from "../../../features/userSlice";

interface UserItem {
  firstName: string;
  lastName: string;
  email: string;
  availableLeave: string;
  userId: string;
  password: string;
  leaveTaken: string | number;
  getId: (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    availableLeave: string | number
  ) => void;
}

const UserItem = ({
  firstName,
  lastName,
  email,
  availableLeave,
  userId,
  password,
  getId,
  leaveTaken,
}: UserItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id)).then(() => dispatch(getUsers()));
  };
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {firstName} {lastName}
      </Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{availableLeave}</Table.Cell>
      <Table.Cell>{leaveTaken}</Table.Cell>
      <Table.Cell>
        <div
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer w-fit"
          onClick={() =>
            getId(userId, firstName, lastName, email, password, availableLeave)
          }
        >
          Edit
        </div>
      </Table.Cell>
      <Table.Cell>
        <HiOutlineUserRemove
          onClick={() => handleDeleteUser(userId)}
          color="red"
          className="size-5 cursor-pointer"
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default UserItem;
