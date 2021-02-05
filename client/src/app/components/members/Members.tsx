import React from "react";
import { Member } from "../../../types/Member";
import MemberList from "./components/MemberList";

const Members = () => {
  const members: Member[] = [
    {
      id: "1",
      username: "test1",
    },
    {
      id: "2",
      username: "test2",
    },
    {
      id: "3",
      username: "test3",
    },
    {
      id: "4",
      username: "test4",
    },
  ];

  return (
    <section className="section members">
      <h1 className="section__title section__title--members">
        Members
        <hr className="title__underline" />
      </h1>

      <MemberList members={members} />
    </section>
  );
};

export default Members;
