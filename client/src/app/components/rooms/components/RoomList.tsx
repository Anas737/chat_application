import React from "react";
import { Room as RoomType } from "../../../../types/Room";
import Room from "./Room";

interface RoomListProps {
  rooms: RoomType[];
  joinRoom: (roomId: string) => void;
  currentRoomId: string;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  joinRoom,
  currentRoomId,
}) => {
  if (!rooms) return <ul></ul>;

  return (
    <ul className="list list--rooms">
      {rooms.map((room: RoomType) => (
        <Room
          key={room.id}
          room={room}
          joinRoom={joinRoom}
          active={currentRoomId === room.id}
        />
      ))}
    </ul>
  );
};

export default RoomList;
