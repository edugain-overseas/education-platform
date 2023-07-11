import React from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import styles from "./ChatFeed.module.scss";
import { useSelector } from "react-redux";
import {
  getActiveUsers,
  getMessages,
  getParticipantsData,
} from "../../../redux/chat/chatSelectors";
import MutationDots from "../../Loaders/MutationDots/MutationDots";
import { getUserId } from "../../../redux/user/userSelectors";

export function ChatFeed() {
  const messages = useSelector(getMessages);
  const participantsData = useSelector(getParticipantsData);
  const activeData = useSelector(getActiveUsers);
  const userId = useSelector(getUserId);

  return messages ? (
    <div className={styles.feedWrapper}>
      {messages.map((message) => {
        const userData = participantsData.find(
          (user) => user.UserId === message.sender_id
        );
        const messageFullData = {
          ...message,
          userData,
          online: activeData.id_active_users.includes(message.sender_id),
        };
        const self = message.sender_id === userId;

        return (
          <MessageFromChat
            message={messageFullData}
            type="origin"
            self={self}
            key={message.message_id}
          />
        );
      })}
    </div>
  ) : (
    <MutationDots />
  );
  // <div className={styles.feedWrapper}>
  //   {messages ? messages.map((message) => {
  //     const userData = participantsData.find(user=>user.UserId === message.sender_id);
  //     const messageFullData = {...message, userData}
  //     return (
  //       <MessageFromChat
  //         message={messageFullData}
  //         type="origin"
  //         key={message.message_id}
  //       />
  //     );
  // }
  // return (
  //   <MessageFromChat
  //     message={message}
  //     type="feedback"
  //     key={message.message_id}
  //   />
  // );
  //   }) : <MutationDots/>}
  // </div>
}
