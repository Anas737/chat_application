import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
const cors = require("cors");

// database
import users from "./db/users";
import rooms from "./db/rooms";

import client from "./client";

const app = express();
const server = new http.Server(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

// routes
app.get("/", (req: any, res: any) => {
  res
    .send({ response: "Welcome to chat application, the server is online !" })
    .status(200);
});

// create default room
const DEFAULT_ROOM = "HOME";
const { room } = rooms.createRoom(DEFAULT_ROOM);

// listening to server & socket events
io.on("connect", (socket: socketio.Socket) => {
  // on connect
  socket.on("user::connect", (username: string) => {
    // const { user } = users.getUserByUsername(username);

    // if (user) {
    //   client.onJoin(io, socket, user.roomId);
    //   return;
    // }

    console.log("New client connected !");

    client.onConnect(io, socket, username, room.id);
  });

  // on create room
  socket.on("room::create", (roomName: string) =>
    client.onCreateRoom(io, socket, roomName)
  );

  // on join
  socket.on("user::join", (roomId: string) =>
    client.onJoin(io, socket, roomId)
  );

  // on joined
  socket.on("user::joined", () => client.onJoined(io, socket));

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
