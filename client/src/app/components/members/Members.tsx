import React from "react";
import { Member as MemberType } from "../../../types/Member";
import MemberList from "./components/MemberList";

interface MembersProps {
  roomName: string;
  members: MemberType[];
}

const Members: React.FC<MembersProps> = ({ roomName, members }) => {
  return (
    <section className="section section--members">
      <h1 className="section__title section__title--members">
        {roomName} Members
        <hr className="separator separator--members" />
      </h1>

      <MemberList members={members} />
    </section>
  );
};

export default Members;
