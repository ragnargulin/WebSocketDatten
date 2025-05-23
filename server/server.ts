import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

let guestIndex = 1;

io.on("connection", (socket) => {
  console.log(`A user connected: ` + socket.id);
  socket.data.name = "Guest" + guestIndex++;

  socket.on("like", () => {
    io.emit("like");
  });

  socket.on("position", (pos) => {
    console.log(`${socket.data.name} moved to:`, pos);
    io.emit("playerMoved", pos); // broadcast to everyone

  });
});

io.listen(3000);
console.log("Websocket server is running on port 3000");
