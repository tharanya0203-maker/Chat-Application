const colors = [
  "#E63946",
  "#457B9D",
  "#2A9D8F",
  "#F4A261",
  "#6A4C93",
  "#3A86FF",
  "#8338EC",
  "#06D6A0",
  "#FF006E",
  "#8D99AE"
];

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
  online,
}) => {

  const color =
    colors[
      user.username.charCodeAt(0) % colors.length
    ];

  return (
    <div
      className={
        selectedUser?.username === user.username
          ? "user-card active-user"
          : "user-card"
      }
      onClick={() => setSelectedUser(user)}
    >
      <div
        className="avatar"
        style={{ background: color }}
      >
        {user.username.charAt(0).toUpperCase()}
      </div>

      <div className="user-info">
        <h4>{user.username}</h4>

        <p>
          {online ? "🟢 Online" : "⚪ Offline"}
        </p>
      </div>
    </div>
  );
};

export default UserCard;