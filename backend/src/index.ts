import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { UserManager } from "./Managers/UserManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    userManager.removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
