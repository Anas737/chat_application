import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as cors from "cors";

// database
import users from "./db/users";
import rooms from "./db/rooms";

import client from "./client";
import { createInterface } from "readline";

const app = express();
const server = new http.Server(app);
const io = new socketio.Server(server);

app.use(cors());

// routes
app.get("/", (req: any, res: any) => {
  res
    .send({ response: "Welcome to chat application, the server is online !" })
    .status(200);
});

// create default room
const DEFAULT_ROOM = "HOME";
const { room } = rooms.addRoom(DEFAULT_ROOM);

// listening to server & socket events
io.on("connect", (socket: socketio.Socket) => {
  // on connect
  socket.on("user::connect", (username: string) =>
    client.onConnect(io, socket, username, room.id)
  );

  // on join
  socket.on("user::join", () => client.onJoin(io, socket));

  // on send message
  socket.on("user::sendMessage", (content: string) =>
    client.onSendMessage(io, socket, content)
  );

  // on leave
  socket.on("user::leave", () => client.onLeave(io, socket));

  // on disconnect
  socket.on("user::disconnect", () => client.onDisconnect(io, socket));
});

// start the server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
