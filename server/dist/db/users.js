"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// users
let users = [];
// user
const findUserById = (userId) => {
    return users.find((user) => user.id === userId);
};
const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
};
const getUserById = (userId) => {
    const user = findUserById(userId);
    if (!user)
        return { error: `User with the id ${userId} does not exist` };
    return { user };
};
const getUserByUsername = (username) => {
    const user = findUserByUsername(username);
    if (!user)
        return { error: `User with the username ${username} does not exist` };
    return { user };
};
const getRoomUsers = (roomId) => {
    const roomUsers = users.filter((_user) => _user.roomId === roomId);
    return { users: roomUsers };
};
const getAll = () => {
    return { users };
};
const addUser = (user) => {
    user.username = user.username.trim();
    // check is the username is not empty
    if (!user.username)
        return { error: "Please enter a username to continue" };
    // check if the username is taken
    const toFind = findUserByUsername(user.username);
    if (toFind)
        return { error: "Username is already taken, please specify another one" };
    // create & add the new user to users' array
    users.push(user);
    return { user };
};
const removeUser = (id) => {
    const user = findUserById(id);
    users = users.filter((_user) => _user.id !== id);
    return { user };
};
exports.default = {
    getUserById,
    getUserByUsername,
    getRoomUsers,
    getAll,
    addUser,
    removeUser,
};
//# sourceMappingURL=users.js.map