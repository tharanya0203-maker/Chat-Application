require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));


// socketio login

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Register user's socket
    socket.on("userOnline", (username) => {
        userSocketMap[username] = socket.id;

        io.emit("onlineUsers", Object.keys(userSocketMap));
    });


    // Send message to specific receiver
    socket.on("sendMessage", (data) => {
        const receiverSocketId = userSocketMap[data.receiver];

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", data);
        }

        socket.emit("receiveMessage", data);
    });


    socket.on("disconnect", () => {

        // Remove user from map on disconnect
        for (const [username, id] of Object.entries(userSocketMap)) {

            if (id === socket.id) {
                delete userSocketMap[username];
                break;
            }
        }

        io.emit("onlineUsers", Object.keys(userSocketMap));
    });

});


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");

    server.listen(5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});