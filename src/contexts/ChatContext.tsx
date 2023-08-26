import React, { createContext, useContext, useEffect, useState } from "react";
import { IMessage } from "../types";
import {
  useGetMessagesSubscription,
  useCreateMessageMutation,
} from "../apollo/hooks";

interface ChatContextType {
  user: string;
  messages: IMessage[];
  sendMessage: (message: IMessage) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("chatUser");
    if (storedUser) {
      setUser(storedUser);
    } else {
      const newUser = `user${Math.floor(Math.random() * 100)}`;
      localStorage.setItem("chatUser", newUser);
      setUser(newUser);
    }
  }, []);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const storedMessages = useGetMessagesSubscription();
  const sendNewMessage = useCreateMessageMutation();

  const sendMessage = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    sendNewMessage(message);
  };

  useEffect(() => {
    if (storedMessages.length) {
      setMessages(storedMessages);
    }
  }, [storedMessages]);

  const contextValue: ChatContextType = {
    user,
    messages,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
