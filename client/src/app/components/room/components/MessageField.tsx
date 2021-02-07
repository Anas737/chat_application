import React from "react";
import { Message as MessageType } from "../../../../types/Message";

interface MessageFieldProps {
  sendMessage: (message: string) => void;
}

const MessageField: React.FC<MessageFieldProps> = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");

  const handleOnChange = React.useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSendMessage = React.useCallback(
    (e) => {
      if (e.keyCode !== 13) return;

      sendMessage(message);
      setMessage("");
    },
    [sendMessage, message]
  );

  return (
    <div className="message-field">
      <hr className="separator" />
      <input
        className="message-field__input"
        type="text"
        value={message}
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(e) => handleSendMessage(e)}
      />
    </div>
  );
};

export default MessageField;
