const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", ({ message, sender }) => {
    io.emit("receiveMessage", { message, sender }); // Broadcast only once
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(5000, () => console.log("Server running on port 5000"));
