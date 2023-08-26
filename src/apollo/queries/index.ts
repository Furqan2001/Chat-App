import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messages(order_by: { id: asc }) {
      user
      content
    }
  }
`;

export const NEW_MESSAGE_FRAGMENT = gql`
  fragment NewMessage on messages {
    id
    content
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($user: String!, $content: String!) {
    insert_messages(objects: { user: $user, content: $content }) {
      returning {
        user
        content
      }
    }
  }
  ${NEW_MESSAGE_FRAGMENT}
`;
