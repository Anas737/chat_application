import React from "react";
import "./App.css";

import Socket from "../socket";

import { Room as RoomType } from "../types/Room";
import { Message as MessageType } from "../types/Message";

import MobileBar from "./components/MobileBar";
import Members from "./components/members";
import Rooms from "./components/rooms";
import Room from "./components/room";
import CreateRoom from "./components/forms/CreateRoom";

let client: Socket;

const createRoom = (roomName: string) => client.createRoom(roomName);

const joinRoom = (roomId: string) => {
  client.leaveRoom(roomId);
  client.join(roomId);
};

const sendMessage = (message: string) => {
  if (!message.trim()) return;

  client.sendMessage(message);
};

const disconnect = () => client.disconnect();

const App = () => {
  const [isRoomsShown, setRoomsShown] = React.useState(false);
  const [isMembersShown, setMembersShown] = React.useState(false);
  const [isCreateRoomDisplayed, setCreateRoomDisplayed] = React.useState(false);

  const [rooms, setRooms] = React.useState([] as RoomType[]);
  const [currentRoom, setCurrentRoom] = React.useState({} as RoomType);
  const [isRoomChanged, setRoomChanged] = React.useState(false);

  React.useEffect(() => {
    if (!isRoomChanged) return;

    client.joined();
    setRoomChanged(false);
  }, [isRoomChanged]);

  React.useEffect(() => {
    client = new Socket(`User ${Math.random() * 100}`);

    client.on("error", (error: any) => alert(error));
    client.on("rooms::all", (rooms: RoomType[]) => setRooms(rooms));
    client.on("room::data", (room: RoomType) => {
      setCurrentRoom(room);
      setRoomChanged(true);
    });
    client.on("room::update", (updatedRoom: RoomType) => {
      setCurrentRoom(updatedRoom);
    });

    return () => {
      client.off("error");
      client.off("rooms::all");
      client.off("room::data");
      client.off("room::update");
    };
  }, []);

  // mobile
  let showClass = "";

  if (isRoomsShown) showClass = "show-rooms";
  if (isMembersShown) showClass = "show-members";

  const toggleIsRoomsShown = React.useCallback(() => {
    setRoomsShown(!isRoomsShown);
    setMembersShown(false);
  }, [isRoomsShown]);

  const toggleIsMembersShown = React.useCallback(() => {
    setMembersShown(!isMembersShown);
    setRoomsShown(false);
  }, [isMembersShown]);

  // create room
  const openCreateRoom = React.useCallback(() => {
    setCreateRoomDisplayed(true);
  }, []);

  const closeCreateRoom = React.useCallback(() => {
    setCreateRoomDisplayed(false);
  }, []);

  return (
    <div className={`app ${showClass}`.trim()}>
      {/* mobile */}
      <MobileBar
        toggleIsRoomsShown={toggleIsRoomsShown}
        toggleIsMembersShown={toggleIsMembersShown}
      />
      {/* rooms */}
      <Rooms
        rooms={rooms}
        joinRoom={joinRoom}
        openCreateRoom={openCreateRoom}
        currentRoomId={currentRoom.id}
      />
      {/* room's members */}
      <Members roomName={currentRoom.name} members={currentRoom.members} />
      {/* room's discussion */}
      <Room messages={currentRoom.messages} sendMessage={sendMessage} />
      {/* create room form */}
      {isCreateRoomDisplayed && (
        <CreateRoom createRoom={createRoom} closeCreateRoom={closeCreateRoom} />
      )}
    </div>
  );
};

export default App;
