import React from "react";
import ChatInput from "../components/major/ChatInput";
import MessageList from "../components/major/MessageList";

const ChatPage: React.FC = () => {
  return (
    <div className="chat-page">
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatPage;
