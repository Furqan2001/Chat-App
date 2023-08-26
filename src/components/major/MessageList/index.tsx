import React, { useRef, useEffect } from "react";
import { useChatContext } from "../../../contexts/ChatContext";
import Message from "./Message";
import classes from "./MessageList.module.scss";
import Spinner from "../../minor/Spinner";

const MessageList = () => {
  const { user, messages } = useChatContext();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageContainerRef} className={classes.MessageList}>
      {messages.length ? (
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              message={message}
              ownMessage={user == message.user}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MessageList;
