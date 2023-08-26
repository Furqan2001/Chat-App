import React from "react";
import { render } from "@testing-library/react";
import Message from "../Message";

const mockMessage = {
  user: "Alice",
  content: "Hello, how are you?",
};

test("renders message content and user correctly", () => {
  const { getByText } = render(
    <Message message={mockMessage} ownMessage={false} />
  );

  const userElement = getByText(mockMessage.user);
  const contentElement = getByText(mockMessage.content);

  expect(userElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});

// Add more tests as needed
