import User from "User";
import { v4 as uuid } from "uuid";
import Message from "../types/Message";

// types
import Room from "../types/Room";
// users
import users from "./users";
// rooms
let rooms = [] as Room[];
// messages limit
const MESSAGES_LIMIT = 10;

// room
const findRoomById = (roomId: string) => {
  return rooms.find((_room) => _room.id === roomId);
};

const findRoomByName = (roomName: string) => {
  return rooms.find((_room) => _room.name === roomName);
};

const getRoomById = (roomId: string) => {
  const room = findRoomById(roomId);

  if (!room) return { error: `Room with the id ${roomId} does not exist.` };

  return { room };
};

const getRoomByName = (roomName: string) => {
  const room = findRoomByName(roomName);

  if (!room) return { error: `Room with the name ${roomName} does not exist.` };

  return { room };
};

const getAll = () => {
  return { rooms };
};

const addRoom = (roomName: string) => {
  roomName = roomName.trim();

  // check if the room name already used
  const room = findRoomByName(roomName);
  if (room)
    return { error: "Room name already used, please specify another one." };

  // create & add new room
  const id = uuid();

  const newRoom: Room = {
    id,
    name: roomName,
    members: [],
    messages: [],
  };

  rooms.push(newRoom);

  return { room: newRoom };
};

const removeRoom = (roomId: string) => {
  const room = findRoomById(roomId);

  if (!room) return { error: `Room with the id ${roomId} does not exist.` };

  rooms = rooms.filter((_room) => _room.id === roomId);

  return { room };
};

// members
const getAllMembers = (roomId: string) => {
  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { members: [] };

  return { members: room.members };
};

const addMember = (roomId: string, member: User) => {
  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { error: `Room with the id ${roomId} does not exist` };

  room.members.push(member);

  return { room };
};

const removeMember = (roomId: string, memberId: string) => {
  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { error: `Room with the id ${roomId} does not exist` };

  room.members = room.members.filter((_member) => _member.id !== memberId);

  return { room };
};

// messages
const findMessageById = (roomId: string, messageId: string) => {
  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return null;

  return room.messages.find((_message: Message) => _message.id === messageId);
};

const getMessageById = (roomId: string, messageId: string) => {
  const message = findMessageById(roomId, messageId);

  if (!message)
    return {
      error: `Message with the id ${messageId} or the room with the id ${roomId} does not exist.`,
    };

  return { message };
};

const getAllMessages = (roomId: string) => {
  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { messages: [] };

  return { messages: room.messages };
};

const addMessage = (user: User, content: string) => {
  const { roomId } = user;
  content = content.trim();
  // check if the message is not empty
  if (!content) return { error: "You can not send an empty message" };

  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { error: `Room with the id ${roomId} does not exist` };

  // create & add new message
  const id = uuid();
  const message: Message = {
    id,
    authorId: user.id,
    content,
  };

  room.messages.push(message);

  // keep messages total equal to messages limit
  if (room.messages.length > MESSAGES_LIMIT)
    room.messages = room.messages.slice(1);

  return { room };
};

const removeMessage = (user: User, message: Message) => {
  const { roomId } = user;
  const messageId = message.id;

  // check if the room exists
  const room = findRoomById(roomId);
  if (!room) return { error: `Room with the id ${roomId} does not exist` };

  // check if the user is the author
  if (message.authorId === user.id)
    return { error: "You can not remove others' messages" };

  room.messages = room.messages.filter(
    (_message: Message) => _message.id !== messageId
  );

  return { room };
};

export default {
  getRoomById,
  getRoomByName,
  getAll,
  addRoom,
  removeRoom,

  getAllMembers,
  addMember,
  removeMember,

  getMessageById,
  getAllMessages,
  addMessage,
  removeMessage,
};
