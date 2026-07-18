import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

import { useAuth } from "../context/AuthContext";

import "../styles/chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const { user, logout } = useAuth();

  return (
    <div className="chat-page">

      {/* Navbar */}

      <div className="navbar">

        <div className="logo">
          💬 Chat App
        </div>

        <div className="navbar-right">

          <span className="username">
            Welcome, {user}
          </span>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main */}

      <div className="chat-container">

        {/* Sidebar */}

        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        {/* Chat */}

        <ChatWindow
          selectedUser={selectedUser}
        />

      </div>

    </div>
  );
};

export default Chat;