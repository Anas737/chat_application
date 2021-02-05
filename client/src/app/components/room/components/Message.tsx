import React from "react";
import { Message as MessageType } from "../../../../types/Message";

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { content } = message;
  return <li className="list-item list-item--messages">{content}</li>;
};

export default Message;
