import CreateUser from "../../components/adminModals/createUser/CreateUser";
import EditUser from "../../components/adminModals/editUser/EditUser";
import UserList from "../../components/userList/UserList";

const Users = () => {
  return (
    <div className="">
      <UserList />
      <EditUser />
      <CreateUser />
    </div>
  );
};
export default Users;
