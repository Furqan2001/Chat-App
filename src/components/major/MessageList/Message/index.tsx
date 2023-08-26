import React from "react";
import classes from "./Message.module.scss";
import { IMessage } from "../../../../types";
import Linkify from "react-linkify";
import UrlPreview from "../../../minor/UrlPreview";

interface MessageProps {
  message: IMessage;
  ownMessage: Boolean;
}

const componentDecorator = (href: string, text: string, key: number) => (
  <a href={href} key={key} target="_blank">
    {text}
  </a>
);

const Message = ({ message, ownMessage }: MessageProps) => {
  const hasLink = !!message.content.match(/\bhttps?:\/\/\S+/gi)?.length;

  return (
    <div
      className={classes.Message}
      style={
        ownMessage ? { alignItems: "flex-end" } : { alignItems: "flex-start" }
      }
    >
      <span className={classes.MessageOwner}>{message.user}</span>
      <div
        className={classes.MessageContent}
        style={hasLink ? { maxWidth: "380px" } : undefined}
      >
        <div className={classes.MessageText}>
          <Linkify componentDecorator={componentDecorator}>
            {message.content}
          </Linkify>
        </div>
        {message.content.match(/\bhttps?:\/\/\S+/gi)?.map((url, idx) => (
          <div key={idx} className="url-container">
            <UrlPreview url={url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
