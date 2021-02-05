import React from "react";
import { Message as MessageType } from "../../../types/Message";
import MessageList from "./components/MessageList";
import MessageField from "./components/MessageField";

const Room = () => {
  const messages: MessageType[] = [
    {
      id: "1",
      content: "message 1",
    },
    {
      id: "2",
      content: "message 2",
    },
    {
      id: "3",
      content: "message 3",
    },
  ];

  return (
    <section className="section section--room">
      <MessageList messages={messages} />

      <hr className="separator" />

      <MessageField />
    </section>
  );
};

export default Room;
