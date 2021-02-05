import React from "react";
import "./App.css";

import MobileBar from "./components/mobile-bar";
import Members from "./components/members";
import Rooms from "./components/rooms";
import Room from "./components/room";

const App = () => {
  const [isRoomsShown, setRoomsShown] = React.useState(false);
  const [isMembersShown, setMembersShown] = React.useState(false);

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
      <Rooms />
      {/* room's members */}
      <Members />
      {/* room's discussion */}
      <Room />
    </div>
  );
};

export default App;
