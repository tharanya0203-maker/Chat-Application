import { useEffect, useState } from "react";
import { getUsers } from "../services/authService";
import { useSocket } from "../context/SocketContext";
import UserCard from "./UserCard";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { onlineUsers } = useSocket();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <h2>💬 Chat App</h2>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <p className="no-users">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              online={onlineUsers.includes(user.username)}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Sidebar;