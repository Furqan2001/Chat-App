import React, { useState } from "react";
import classes from "./ChatInput.module.scss";
import { IMessage } from "../../../types";
import { useChatContext } from "../../../contexts/ChatContext";

const ChatInput = () => {
  const { user, sendMessage } = useChatContext();
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() !== "") {
      sendMessage({
        user,
        content: inputText,
      });
      setInputText("");
    }
  };

  return (
    <div className={classes.ChatInputContainer}>
      <input
        className={classes.Input}
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button className={classes.Button} onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
