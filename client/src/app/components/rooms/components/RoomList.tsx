import React from "react";
import { Room as RoomType } from "../../../../types/Room";
import Room from "./Room";

interface RoomListProps {
  rooms: RoomType[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <ul className="list list--rooms">
      {rooms.map((room: RoomType) => (
        <Room key={room.id} room={room} />
      ))}
    </ul>
  );
};

export default RoomList;