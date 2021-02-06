import React from "react";
import { Room as RoomType } from "../../../types/Room";
import RoomList from "./components/RoomList";
import SearchField from "./components/SearchField";

interface RoomsProps {
  rooms: RoomType[];
}

const Rooms: React.FC<RoomsProps> = ({ rooms }) => {
  return (
    <section className="section section--rooms">
      <header className="section__header section__header--rooms">
        <h1 className="section__title section__title--rooms">Rooms</h1>
        <button className="rooms__add-btn">
          <i className="fas fa-plus"></i>
        </button>
      </header>

      <SearchField />
      <RoomList rooms={rooms} />
    </section>
  );
};

export default Rooms;
