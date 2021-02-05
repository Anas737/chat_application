import React from "react";
import { Member as MemberType } from "../../../../types/Member";

interface MemberProps {
  member: MemberType;
}

const Member: React.FC<MemberProps> = ({ member }) => {
  const { username } = member;

  return <li className="member">{member.username}</li>;
};

export default Member;
