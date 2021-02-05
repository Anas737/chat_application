import React from "react";
import { Member as MemberType } from "../../../../types/Member";
import Member from "./Member";

interface MemberListProps {
  members: MemberType[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <ul className="members__list">
      {members.map((member: MemberType) => (
        <Member key={member.id} member={member} />
      ))}
    </ul>
  );
};

export default MemberList;
