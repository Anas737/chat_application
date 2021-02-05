import React from "react";
import { Room as RoomType } from "../../../../types/Room";

interface RoomProps {
  room: RoomType;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const { name } = room;
  return (
    <li className="list-item list-item--rooms">
      <h2 className="list-item__title list-item__title--rooms">{name}</h2>
    </li>
  );
};

export default Room;
