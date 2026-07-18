import { useAuth } from "../context/AuthContext";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const isSender = message.sender === user;

  return (
    <div
      className={
        isSender
          ? "message-row sender"
          : "message-row receiver"
      }
    >
      <div
        className={
          isSender
            ? "message sender-message"
            : "message receiver-message"
        }
      >
        <p>{message.text}</p>

        <span>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;