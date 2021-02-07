import React from "react";
import { Message as MessageType } from "../../../types/Message";
import MessageList from "./components/MessageList";
import MessageField from "./components/MessageField";

interface RoomProps {
  messages: MessageType[];
  sendMessage: (message: string) => void;
}

const Room: React.FC<RoomProps> = ({ messages, sendMessage }) => {
  return (
    <section className="section section--room">
      <MessageList messages={messages} />
      <MessageField sendMessage={sendMessage} />
    </section>
  );
};

export default Room;
