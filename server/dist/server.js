"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const rooms_1 = require("./db/rooms");
const client_1 = require("./client");
const app = express();
const server = new http.Server(app);
const io = new socketio.Server(server);
app.use(cors());
// routes
app.get("/", (req, res) => {
    res
        .send({ response: "Welcome to chat application, the server is online !" })
        .status(200);
});
// create default room
const DEFAULT_ROOM = "HOME";
const { room } = rooms_1.default.addRoom(DEFAULT_ROOM);
// listening to server & socket events
io.on("connect", (socket) => {
    // on connect
    socket.on("user::connect", (username) => client_1.default.onConnect(io, socket, username, room.id));
    // on join
    socket.on("user::join", () => client_1.default.onJoin(io, socket));
    // on send message
    socket.on("user::sendMessage", (content) => client_1.default.onSendMessage(io, socket, content));
    // on leave
    socket.on("user::leave", () => client_1.default.onLeave(io, socket));
    // on disconnect
    socket.on("user::disconnect", () => client_1.default.onDisconnect(io, socket));
});
// start the server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=server.js.map