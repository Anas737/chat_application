import React from "react";
import { Room } from "../../../types/Room";
import RoomList from "./components/RoomList";
import SearchField from "./components/SearchField";

const Rooms = () => {
  const rooms: Room[] = [
    {
      id: "1",
      name: "room1",
    },
    {
      id: "2",
      name: "room2",
    },
    {
      id: "3",
      name: "room3",
    },
  ];

  return (
    <section className="section section--rooms">
      <h1 className="section__title section__title--rooms">Rooms</h1>
      <SearchField />
      <RoomList rooms={rooms} />
    </section>
  );
};

export default Rooms;
