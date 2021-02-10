import React from "react";
import { Message as MessageType } from "../../../../types/Message";

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { author, content } = message;
  return (
    <li className="list-item list-item--messages">
      <div className="message">
        <div className="message__author">{author}</div>
        <div className="message__content">{content}</div>
      </div>
    </li>
  );
};

export default Message;
