import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Message from "./model/messageModel.js";
import User from "./model/userModel.js";
import app from "./app.js";

dotenv.config();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

let activeUsercount = 0;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Get initial total chat count from DB
let totalChatCount = 0;
const initializeChatCount = async () => {
  totalChatCount = await Message.countDocuments();
};
initializeChatCount();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  //active user increment
  activeUsercount++;
  io.emit("activeUsers", activeUsercount);
  io.emit("chatCount", totalChatCount);

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, message } = data;
      if (!senderId || !message?.trim()) return;

      const user = await User.findById(senderId);
      if (!user) return console.error("User not found:", senderId);

      const newMessage = new Message({
        sender: senderId,
        senderName: user.name,
        message,
      });

      await newMessage.save();

      const payload = {
        _id: newMessage._id.toString(),
        senderId: newMessage.sender.toString(),
        senderName: user.name,
        message,
        createdAt: newMessage.createdAt,
      };

      // Send to everyone EXCEPT sender
      socket.broadcast.emit("receiveMessage", payload);

      // Send saved message back to sender with _id from DB
      socket.emit("messageSent", payload);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  // Update total chat count
  totalChatCount++;
  io.emit("chatCount", totalChatCount); // broadcast new count to everyone

  socket.on("disconnect", () => {
    activeUsercount--;
    io.emit("activeUsers", activeUsercount);
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
