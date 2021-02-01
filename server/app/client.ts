import { Socket, Server } from "socket.io";
// types
import User from "./types/User";
// database
import users from "./db/users";
import rooms from "./db/rooms";

const onConnect = (
  server: Server,
  client: Socket,
  username: string,
  roomId: string
) => {
  const userData: User = {
    id: client.id,
    username,
    roomId,
  };

  // try to add the user to the database
  const { error, user } = users.addUser(userData);

  if (error) return { error };

  // make the user join the room
  return onJoin(server, client);
};

const onJoin = (server: Server, client: Socket) => {
  const { user } = users.getUserById(client.id);
  const { username, roomId } = user;

  // join the room
  client.join(roomId);

  // find the room
  const { error, room } = rooms.getRoomById(roomId);
  if (!room) return { error };

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
  const roomUsers = users.getRoomUsers(roomId).users;

  client.emit("room::data", {
    id: room.id,
    name: room.name,
    users: roomUsers,
    messages: room.messages,
  });
};

const onSendMessage = (server: Server, client: Socket, content: string) => {
  // get the user
  const getUserResult = users.getUserById(client.id);
  if (getUserResult.error) return { error: getUserResult.error };

  const user = getUserResult.user;
  const { roomId } = user;

  // add the new message to the room
  const addMessageResult = rooms.addMessage(user, content);

  if (addMessageResult) return { error: addMessageResult.error };

  // broadcast the message to the room's users
  server.to(roomId).emit("room::message", {
    author: user,
    content,
  });
};

const onLeave = (server: Server, client: Socket) => {
  const { user } = users.getUserById(client.id);
  const { username, roomId } = user;

  // find the room
  const { room, error } = rooms.getRoomById(roomId);
  if (!room) return { error };

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

const onDisconnect = (server: Server, client: Socket) => {
  onLeave(server, client);

  // remove user from database
  users.removeUser(client.id);
};

export default {
  onConnect,
  onJoin,
  onSendMessage,
  onLeave,
  onDisconnect,
};
