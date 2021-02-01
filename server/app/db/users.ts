import User from "../types/User";

// users
let users = [] as User[];

// user
const findUserById = (userId: string) => {
  return users.find((user) => user.id === userId);
};

const findUserByUsername = (username: string) => {
  return users.find((user) => user.username === username);
};

const getUserById = (userId: string) => {
  const user = findUserById(userId);

  if (!user) return { error: `User with the id ${userId} does not exist` };

  return { user };
};

const getUserByUsername = (username: string) => {
  const user = findUserByUsername(username);

  if (!user)
    return { error: `User with the username ${username} does not exist` };

  return { user };
};

const getRoomUsers = (roomId: string) => {
  const roomUsers = users.filter((_user) => _user.roomId === roomId);

  return { users: roomUsers };
};

const getAll = () => {
  return { users };
};

const addUser = (user: User) => {
  user.username = user.username.trim();

  // check is the username is not empty
  if (!user.username) return { error: "Please enter a username to continue" };

  // check if the username is taken
  const toFind = findUserByUsername(user.username);

  if (toFind)
    return { error: "Username is already taken, please specify another one" };

  // create & add the new user to users' array
  users.push(user);

  return { user };
};

const removeUser = (id: string) => {
  const user = findUserById(id);

  users = users.filter((_user) => _user.id !== id);

  return { user };
};

export default {
  getUserById,
  getUserByUsername,
  getRoomUsers,
  getAll,
  addUser,
  removeUser,
};
