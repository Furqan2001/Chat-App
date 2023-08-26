import { CREATE_MESSAGE, MESSAGE_SUBSCRIPTION } from "../queries";
import { useMutation, useSubscription, gql } from "@apollo/client";
import client from "..";
import { IMessage } from "../../types";

export const useGetMessagesSubscription = () => {
  const { data: subscriptionData, loading } = useSubscription(
    MESSAGE_SUBSCRIPTION,
    { client }
  );

  const messages = subscriptionData?.messages || [];

  return messages;
};

export const useCreateMessageMutation = () => {
  const [createMessage] = useMutation(CREATE_MESSAGE, { client });

  const sendNewMessage = async (message: IMessage) => {
    try {
      await createMessage({
        variables: message,
        update(cache, { data: { insert_messages_one } }) {
          // Update the cache with the new message
          cache.modify({
            fields: {
              messages(existingMessages = []) {
                const newMessageRef = cache.writeFragment({
                  data: insert_messages_one,
                  fragment: gql`
                    fragment NewMessage on Message {
                      user
                      content
                    }
                  `,
                });
                return [...existingMessages, newMessageRef];
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  return sendNewMessage;
};
