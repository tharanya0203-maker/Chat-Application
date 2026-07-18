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

const ChatHeader = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="chat-header">
        <h3>Select a user to start chatting</h3>
      </div>
    );
  }

  const color =
    colors[
      selectedUser.username.charCodeAt(0) % colors.length
    ];

  return (
    <div className="chat-header">

      <div
        className="chat-avatar"
        style={{ background: color }}
      >
        {selectedUser.username.charAt(0).toUpperCase()}
      </div>

      <div>
        <h3>{selectedUser.username}</h3>
        <p>Active now</p>
      </div>

    </div>
  );
};

export default ChatHeader;