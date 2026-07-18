import { useEffect, useRef, useState } from "react";
import { getMessages } from "../services/messageService";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);

  const { socket } = useSocket();
  const { user } = useAuth();

  const bottomRef = useRef(null);

  // Load previous messages
  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      try {
        const data = await getMessages(selectedUser.username);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadMessages();
  }, [selectedUser]);

  // Listen for realtime messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {

      // Ignore own message
      if (message.sender === user) return;

      // Only add if message belongs to current chat
      if (
        selectedUser &&
        message.sender === selectedUser.username
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, selectedUser, user]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="chat-empty">
        <h2>Select a user to start chatting</h2>
      </div>
    );
  }

  return (
    <div className="chat-window">

      <ChatHeader selectedUser={selectedUser} />

      <div className="messages">

        {messages.map((message) => (
          <MessageBubble
            key={message._id || `${message.sender}-${message.createdAt}`}
            message={message}
          />
        ))}

        <div ref={bottomRef}></div>

      </div>

      <MessageInput
        selectedUser={selectedUser}
        setMessages={setMessages}
      />

    </div>
  );
};

export default ChatWindow;