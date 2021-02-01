"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// rooms
let rooms = [];
// messages limit
const MESSAGES_LIMIT = 10;
// room
const findRoomById = (roomId) => {
    return rooms.find((_room) => _room.id === roomId);
};
const findRoomByName = (roomName) => {
    return rooms.find((_room) => _room.name === roomName);
};
const getRoomById = (roomId) => {
    const room = findRoomById(roomId);
    if (!room)
        return { error: `Room with the id ${roomId} does not exist.` };
    return { room };
};
const getRoomByName = (roomName) => {
    const room = findRoomByName(roomName);
    if (!room)
        return { error: `Room with the name ${roomName} does not exist.` };
    return { room };
};
const getAll = () => {
    return { rooms };
};
const addRoom = (roomName) => {
    roomName = roomName.trim();
    // check if the room name already used
    const room = findRoomByName(roomName);
    if (room)
        return { error: "Room name already used, please specify another one." };
    // create & add new room
    const id = uuid_1.v4();
    const newRoom = {
        id,
        name: roomName,
        messages: [],
    };
    rooms.push(newRoom);
    return { room: newRoom };
};
const removeRoom = (roomId) => {
    const room = findRoomById(roomId);
    if (!room)
        return { error: `Room with the id ${roomId} does not exist.` };
    rooms = rooms.filter((_room) => _room.id === roomId);
    return { room };
};
// message
const findMessageById = (roomId, messageId) => {
    // check if the room exists
    const room = findRoomById(roomId);
    if (!room)
        return null;
    return room.messages.find((_message) => _message.id === messageId);
};
const getMessageById = (roomId, messageId) => {
    const message = findMessageById(roomId, messageId);
    if (!message)
        return {
            error: `Message with the id ${messageId} or the room with the id ${roomId} does not exist.`,
        };
    return { message };
};
const getAllMessages = (roomId) => {
    // check if the room exists
    const room = findRoomById(roomId);
    if (!room)
        return { messages: [] };
    return { messages: room.messages };
};
const addMessage = (user, content) => {
    const { roomId } = user;
    content = content.trim();
    // check if the message is not empty
    if (!content)
        return { error: "You can not send an empty message" };
    // check if the room exists
    const room = findRoomById(roomId);
    if (!room)
        return { error: `Room with the id ${roomId} does not exist` };
    // create & add new message
    const id = uuid_1.v4();
    const message = {
        id,
        authorId: user.id,
        content,
    };
    room.messages.push(message);
    // keep messages total equal to messages limit
    if (room.messages.length > MESSAGES_LIMIT)
        room.messages = room.messages.slice(1);
    return { message };
};
const removeMessage = (user, message) => {
    const { roomId } = user;
    const messageId = message.id;
    // check if the room exists
    const room = findRoomById(roomId);
    if (!room)
        return { error: `Room with the id ${roomId} does not exist` };
    // check if the user is the author
    if (message.authorId === user.id)
        return { error: "You can not remove others' messages" };
    room.messages = room.messages.filter((_message) => _message.id !== messageId);
    return { message };
};
exports.default = {
    getRoomById,
    getRoomByName,
    getAll,
    addRoom,
    removeRoom,
    getMessageById,
    getAllMessages,
    addMessage,
    removeMessage,
};
//# sourceMappingURL=rooms.js.map