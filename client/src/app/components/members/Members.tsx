import React from "react";
import { Member } from "../../../types/Member";
import MemberList from "./components/MemberList";

const Members = () => {
  const members: Member[] = [
    {
      id: "1",
      username: "member1",
    },
    {
      id: "2",
      username: "member2",
    },
    {
      id: "3",
      username: "member3",
    },
  ];

  return (
    <section className="section section--members">
      <h1 className="section__title section__title--members">
        Members
        <hr className="title__underline" />
      </h1>

      <MemberList members={members} />
    </section>
  );
};

export default Members;
