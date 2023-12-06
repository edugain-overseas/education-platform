import React from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import { useSelector } from "react-redux";
import MutationDots from "../../Loaders/MutationDots/MutationDots";
import { getUserId } from "../../../redux/user/userSelectors";
import styles from "./ChatFeed.module.scss";

export function ChatFeed({ chatData = null, setEditMessage }) {
  const messages = chatData?.messages;
  const participantsData = chatData?.participantsData;
  const activeData = chatData?.activeData;
  const userId = useSelector(getUserId);

  return messages ? (
    <div className={styles.feedWrapper}>
      {messages.filter(({deleted})=>!deleted).map((message, index) => {
        const userData = participantsData?.find(
          (user) => user.userId === message.senderId
        );
        const messageFullData = {
          ...message,
          userData,
          online: activeData?.idsActiveUsers?.includes(message.senderId),
        };
        const self = message.senderId === userId;
        const readed = message.readBy?.includes(`${userId}`);
        return (
          <React.Fragment key={index}>
            <MessageFromChat
              key={message.messageId}
              message={messageFullData}
              type="origin"
              self={self}
              readed={userId === message.senderId ? true : readed}
              chatData={chatData}
              senderId={message.senderId}
              setEditMessage={setEditMessage}
            />
            {message.answers?.length !== 0 &&
              message.answers &&
              message.answers.filter(({deleted})=>!deleted).map((answer, index, answersArray) => {
                const userData = participantsData.find(
                  (user) => user.userId === answer.senderId
                );
                const messageFullData = {
                  ...answer,
                  userData,
                  online: activeData.idsActiveUsers.includes(answer.senderId),
                };
                const readed = answer.readBy.includes(`${userId}`);
                return (
                  <MessageFromChat
                    message={messageFullData}
                    type="answer"
                    self={self}
                    key={`${answer.answerId}a`}
                    lastElement={answersArray.length === index + 1}
                    readed={userId === answer.senderId ? true : readed}
                    chatData={chatData}
                    senderId={answer.senderId}
                    setEditMessage={setEditMessage}
                  />
                );
              })}
          </React.Fragment>
        );
      })}
    </div>
  ) : (
    <MutationDots />
  );
}
