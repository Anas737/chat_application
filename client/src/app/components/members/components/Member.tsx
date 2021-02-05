import React from "react";
import { Member as MemberType } from "../../../../types/Member";

interface MemberProps {
  member: MemberType;
}

const Member: React.FC<MemberProps> = ({ member }) => {
  const { username } = member;

  return (
    <li className="list-item list-item--members">
      <h2 className="list-item__title list-item__title--rooms">{username}</h2>
    </li>
  );
};

export default Member;
