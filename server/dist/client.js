"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database
const users_1 = require("./db/users");
const rooms_1 = require("./db/rooms");
const onConnect = (server, client, username, roomId) => {
    const userData = {
        id: client.id,
        username,
        roomId,
    };
    // try to add the user to the database
    const { error, user } = users_1.default.addUser(userData);
    if (error)
        return { error };
    // make the user join the room
    return onJoin(server, client);
};
const onJoin = (server, client) => {
    const { user } = users_1.default.getUserById(client.id);
    const { username, roomId } = user;
    // join the room
    client.join(roomId);
    // find the room
    const { error, room } = rooms_1.default.getRoomById(roomId);
    if (!room)
        return { error };
    // send & broadcast welcome message
    client.emit("room::message", {
        author: {
            username: room.name,
        },
        content: `Welcome ${username}`,
    });
    client.to(room.id).emit("room::message", {
        author: {
            username: room.name,
        },
        content: `${username} has joined !`,
    });
    // send room users & messages
    const roomUsers = users_1.default.getRoomUsers(roomId).users;
    client.emit("room::data", {
        id: room.id,
        name: room.name,
        users: roomUsers,
        messages: room.messages,
    });
};
const onSendMessage = (server, client, content) => {
    // get the user
    const getUserResult = users_1.default.getUserById(client.id);
    if (getUserResult.error)
        return { error: getUserResult.error };
    const user = getUserResult.user;
    const { roomId } = user;
    // add the new message to the room
    const addMessageResult = rooms_1.default.addMessage(user, content);
    if (addMessageResult)
        return { error: addMessageResult.error };
    // broadcast the message to the room's users
    server.to(roomId).emit("room::message", {
        author: user,
        content,
    });
};
const onLeave = (server, client) => {
    const { user } = users_1.default.getUserById(client.id);
    const { username, roomId } = user;
    // find the room
    const { room, error } = rooms_1.default.getRoomById(roomId);
    if (!room)
        return { error };
    // leave the room
    client.leave(room.id);
    // broadcast user leave
    server.to(room.id).emit("room::leave", {
        user,
    });
    server.to(room.id).emit("room::message", {
        author: {
            username: room.name,
        },
        content: `${username} has left the room`,
    });
};
const onDisconnect = (server, client) => {
    onLeave(server, client);
    // remove user from database
    users_1.default.removeUser(client.id);
};
exports.default = {
    onConnect,
    onJoin,
    onSendMessage,
    onLeave,
    onDisconnect,
};
//# sourceMappingURL=client.js.map