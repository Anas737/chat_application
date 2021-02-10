import React from "react";
import { Room as RoomType } from "../../../types/Room";
import RoomList from "./components/RoomList";
import SearchField from "./components/SearchField";

interface RoomsProps {
  rooms: RoomType[];
  joinRoom: (roomId: string) => void;
  openCreateRoom: () => void;
  currentRoomId: string;
}

const Rooms: React.FC<RoomsProps> = ({
  rooms,
  joinRoom,
  openCreateRoom,
  currentRoomId,
}) => {
  return (
    <section className="section section--rooms">
      <header className="section__header section__header--rooms">
        <h1 className="section__title section__title--rooms">Rooms</h1>
        <button className="rooms__add-btn" onClick={openCreateRoom}>
          <i className="fas fa-plus"></i>
        </button>
      </header>

      <div className="search-field__container">
        <SearchField />
      </div>

      <RoomList
        rooms={rooms}
        joinRoom={joinRoom}
        currentRoomId={currentRoomId}
      />
    </section>
  );
};

export default Rooms;
