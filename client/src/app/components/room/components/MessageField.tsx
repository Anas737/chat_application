import React from "react";
import { Message as MessageType } from "../../../../types/Message";

const MessageField = () => {
  return (
    <div className="message-field">
      <hr className="separator" />
      <input className="message-field__input" type="text" />
    </div>
  );
};

export default MessageField;
