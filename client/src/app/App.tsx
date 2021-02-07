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

const sendMessage = (message: string) => {
  if (!message.trim()) return;

  client.sendMessage(message);
};

const joinRoom = (roomId: string) => {
  client.leaveRoom();
  client.join(roomId);
};

const disconnect = () => client.disconnect();

const App = () => {
  const [isRoomsShown, setRoomsShown] = React.useState(false);
  const [isMembersShown, setMembersShown] = React.useState(false);

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

  return (
    <div className={`app ${showClass}`.trim()}>
      {/* mobile */}
      <MobileBar
        toggleIsRoomsShown={toggleIsRoomsShown}
        toggleIsMembersShown={toggleIsMembersShown}
      />
      {/* rooms */}
      <Rooms rooms={rooms} joinRoom={joinRoom} />
      {/* room's members */}
      <Members members={currentRoom.members} />
      {/* room's discussion */}
      <Room messages={currentRoom.messages} sendMessage={sendMessage} />
    </div>
  );
};

export default App;
