import { useState } from "react";
import { sendMessage } from "../services/messageService";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

const MessageInput = ({ selectedUser, setMessages }) => {
  const [text, setText] = useState("");

  const { socket } = useSocket();
  const { user } = useAuth();

  const handleSend = async () => {
    if (!selectedUser) return;
    if (!text.trim()) return;

    try {
      const newMessage = await sendMessage(
        selectedUser.username,
        text.trim()
      );

      setMessages((prev) => [...prev, newMessage]);

      socket?.emit("sendMessage", {
        sender: user,
        receiver: selectedUser.username,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
      });

      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder={
          selectedUser
            ? "Type your message..."
            : "Select a user first"
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!selectedUser}
      />

      <button
        onClick={handleSend}
        disabled={!selectedUser || !text.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;