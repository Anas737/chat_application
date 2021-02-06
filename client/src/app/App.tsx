import React from "react";
import "./App.css";

import Socket from "../socket";

import { Room as RoomType } from "../types/Room";
import { Message as MessageType } from "../types/Message";

import MobileBar from "./components/MobileBar";
import Members from "./components/members";
import Rooms from "./components/rooms";
import Room from "./components/room";

let client: Socket;

const App = () => {
  const [isRoomsShown, setRoomsShown] = React.useState(false);
  const [isMembersShown, setMembersShown] = React.useState(false);

  const [rooms, setRooms] = React.useState([] as RoomType[]);
  const [currentRoom, setCurrentRoom] = React.useState({} as RoomType);
  const [isRoomChanged, setRoomChanged] = React.useState(false);

  React.useEffect(() => {
    client = new Socket(`Anas ${Math.random() * 100}`);

    client.on("error", (error: any) => alert(error));
    client.on("rooms::all", (rooms: RoomType[]) => setRooms(rooms));
    client.on("room::data", (room: RoomType) => {
      setCurrentRoom(room);
      setRoomChanged(true);
    });
  }, []);

  React.useEffect(() => {
    if (!isRoomChanged) return;

    client.on("room::message", (message: MessageType) => {
      const updatedRoom = { ...currentRoom };

      if (!updatedRoom.messages) return;

      updatedRoom.messages = [...updatedRoom.messages, message];

      setCurrentRoom(updatedRoom);
    });

    client.joined();
    setRoomChanged(false);
  }, [isRoomChanged, currentRoom]);

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

  return (
    <div className={`app ${showClass}`.trim()}>
      {/* mobile */}
      <MobileBar
        toggleIsRoomsShown={toggleIsRoomsShown}
        toggleIsMembersShown={toggleIsMembersShown}
      />
      {/* rooms */}
      <Rooms rooms={rooms} />
      {/* room's members */}
      <Members members={currentRoom.users} />
      {/* room's discussion */}
      <Room messages={currentRoom.messages} />
    </div>
  );
};

export default App;
