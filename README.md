#  Real-Time Chat Application

A full-stack real-time chat application built using the **MERN Stack** with **Socket.IO** for instant messaging. This application allows users to register, securely authenticate, view available users, and communicate through real-time one-to-one messaging.

##  Features

-  User Registration and Login
-  JWT Authentication
-  Password encryption using bcrypt
-  Real-time one-to-one messaging using Socket.IO
-  Online user tracking
-  Search users
-  Online/offline user status
-  Responsive chat interface
-  Protected API routes
-  Real-time message updates

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- Socket.IO Client
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt.js

##  Project Structure
CHAT-BOT
│
├── frontend
│ ├── src
│ ├── components
│ ├── pages
│ └── package.json
│
├── backend
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── server.js
│ └── package.json
│
└── README.md

##  Installation & Setup

### Clone Repository

```bash
git clone <your-repository-url>

//Backend setup
cd backend
npm install
npm run dev

//.env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

//frontend setup
cd frontend
npm install
npm run dev

// Application Flow
User registers an account.
User logs in using JWT authentication.
Authenticated users can view other registered users.
Users can start one-to-one conversations.
Messages are delivered instantly using Socket.IO.

// Future Enhancements
Emoji support
Typing indicator
Image and file sharing
Group conversations
Message read receipts
Notifications


// Author

Tharanya

---
