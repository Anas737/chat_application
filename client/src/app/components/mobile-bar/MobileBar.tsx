import React from "react";

interface MobileBarProps {
  toggleIsRoomsShown: () => void;
  toggleIsMembersShown: () => void;
}

const MobileBar: React.FC<MobileBarProps> = ({
  toggleIsRoomsShown,
  toggleIsMembersShown,
}) => {
  return (
    <div className="mobile-bar">
      <button className="mobile-bar__btn" onClick={toggleIsRoomsShown}>
        Rooms
      </button>
      <button className="mobile-bar__btn" onClick={toggleIsMembersShown}>
        Members
      </button>
    </div>
  );
};

export default MobileBar;
