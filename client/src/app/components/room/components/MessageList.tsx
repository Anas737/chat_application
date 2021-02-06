import React from "react";
import { Message as MessageType } from "../../../../types/Message";
import Message from "./Message";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (!messages) return <ul></ul>;

  return (
    <ul className="list list--messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default MessageList;
