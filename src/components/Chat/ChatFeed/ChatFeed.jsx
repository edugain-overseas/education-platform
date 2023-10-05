import React, { useContext } from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import { useSelector } from "react-redux";
import MutationDots from "../../Loaders/MutationDots/MutationDots";
import { getUserId } from "../../../redux/user/userSelectors";
import {
  getActiveUsers,
  getMessages,
  getParticipantsData,
} from "../../../redux/groupChat/groupChatSelectors";
import { TypeContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import {
  getSubjectActiveUsers,
  getSubjectMessages,
  getSubjectParticipantsData,
} from "../../../redux/subjectChats/subjectChatSelectors";
import styles from "./ChatFeed.module.scss";

export function ChatFeed() {
  const type = useContext(TypeContext) || "group";
  const messages = useSelector(
    type === "group" ? getMessages : getSubjectMessages
  );
  const participantsData = useSelector(
    type === "group" ? getParticipantsData : getSubjectParticipantsData
  );
  const activeData = useSelector(
    type === "group" ? getActiveUsers : getSubjectActiveUsers
  );
  const userId = useSelector(getUserId);

  return messages ? (
    <div className={styles.feedWrapper}>
      {messages.map((message, index) => {
        const userData = participantsData?.find(
          (user) => user.userId === message.senderId
        );
        const messageFullData = {
          ...message,
          userData,
          online: activeData?.idsActiveUsers?.includes(message.senderId),
        };
        const self = message.senderId === userId;
        const readed = message.readBy.includes(`${userId}`);
        return (
          <React.Fragment key={index}>
            <MessageFromChat
              key={message.messageId}
              message={messageFullData}
              type="origin"
              self={self}
              readed={userId === message.senderId ? true : readed}
            />
            {message.answers?.length !== 0 &&
              message.answers &&
              message.answers.map((answer, index, answersArray) => {
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
