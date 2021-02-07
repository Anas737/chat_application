import { Socket, Server } from "socket.io";
import { v4 as uuid } from "uuid";

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

  if (error) {
    client.emit("error", error);

    return;
  }

  // send existing rooms to user
  client.emit("rooms::all", rooms.getAll().rooms);

  // make the user join the default room
  onJoin(server, client, roomId);
};

const onJoin = (server: Server, client: Socket, roomId: string) => {
  const { user } = users.getUserById(client.id);
  const { username } = user;

  // join the room
  client.join(roomId);
  rooms.addMember(roomId, user);

  // find the room
  const { error, room } = rooms.getRoomById(roomId);

  if (error) {
    client.emit("error", error);

    return;
  }

  client.emit("room::data", room);
};

const onJoined = (server: Server, client: Socket) => {
  const { user } = users.getUserById(client.id);
  const { username, roomId } = user;

  // find the room
  const { room } = rooms.getRoomById(roomId);

  // broadcast updated room
  client.broadcast.to(roomId).emit("room::update", room);
};

const onSendMessage = (server: Server, client: Socket, content: string) => {
  // get the user
  const getUserResult = users.getUserById(client.id);
  if (getUserResult.error) return { error: getUserResult.error };

  const user = getUserResult.user;
  const { roomId } = user;

  // add the new message to the room
  const addMessageResult = rooms.addMessage(user, content);

  if (addMessageResult.error) return { error: addMessageResult.error };

  // broadcast updated room
  const updatedRoom = addMessageResult.room;
  server.to(roomId).emit("room::update", updatedRoom);
};

const onLeave = (server: Server, client: Socket) => {
  const { user } = users.getUserById(client.id);
  const { username, roomId } = user;

  // find the room
  const { room, error } = rooms.getRoomById(roomId);
  if (error) {
    client.emit("error", error);

    return;
  }

  // leave the room
  client.leave(room.id);
  const removeMemberResult = rooms.removeMember(room.id, user.id);

  if (removeMemberResult.error) {
    client.emit("error", removeMemberResult.error);

    return;
  }

  // broadcast updated room
  const updatedRoom = removeMemberResult.room;
  server.to(room.id).emit("room::update", updatedRoom);
};

const onDisconnect = (server: Server, client: Socket) => {
  onLeave(server, client);

  // remove user from database
  users.removeUser(client.id);
};

export default {
  onConnect,
  onJoin,
  onJoined,
  onSendMessage,
  onLeave,
  onDisconnect,
};
