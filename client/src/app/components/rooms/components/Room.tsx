import React from "react";
import { Room as RoomType } from "../../../../types/Room";

interface RoomProps {
  room: RoomType;
  joinRoom: (roomId: string) => void;
  active: boolean;
}

const Room: React.FC<RoomProps> = ({ room, joinRoom, active }) => {
  const { id, name } = room;

  const handleJoinRoom = React.useCallback(() => {
    joinRoom(id);
  }, [joinRoom, id]);

  return (
    <li
      className={`list-item list-item--rooms ${active ? "active" : ""}`.trim()}
      onClick={handleJoinRoom}
    >
      <h2 className="list-item__title list-item__title--rooms">{name}</h2>
    </li>
  );
};

export default Room;
