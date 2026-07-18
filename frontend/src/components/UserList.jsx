import UserCard from "./UserCard";

const UserList = ({
  users,
  selectedUser,
  setSelectedUser,
  onlineUsers,
}) => {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          online={onlineUsers.includes(user.username)}
        />
      ))}
    </>
  );
};

export default UserList;