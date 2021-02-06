import React from "react";
import { Message as MessageType } from "../../../types/Message";
import MessageList from "./components/MessageList";
import MessageField from "./components/MessageField";

interface RoomProps {
  messages: MessageType[];
}

const Room: React.FC<RoomProps> = ({ messages }) => {
  return (
    <section className="section section--room">
      <MessageList messages={messages} />
      <MessageField />
    </section>
  );
};

export default Room;
