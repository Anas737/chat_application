import React from "react";
import { Room as RoomType } from "../../../../types/Room";

interface RoomProps {
  room: RoomType;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const { name } = room;
  return <li className="list-item list-item--rooms">{name}</li>;
};

export default Room;
