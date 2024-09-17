import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("A use connected");
});

const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
