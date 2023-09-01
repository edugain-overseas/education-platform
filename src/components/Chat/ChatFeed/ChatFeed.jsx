import React, { useContext } from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import styles from "./ChatFeed.module.scss";
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
        const userData = participantsData.find(
          (user) => user.user_id === message.sender_id
        );
        const messageFullData = {
          ...message,
          userData,
          online: activeData.id_active_users.includes(message.sender_id),
        };
        const self = message.sender_id === userId;
        const readed = message.read_by.includes(`${userId}`);
        return (
          <React.Fragment key={index}>
            <MessageFromChat
              key={message.message_id}
              message={messageFullData}
              type="origin"
              self={self}
              readed={userId === message.sender_id ? true : readed}
            />
            {message.answers?.length !== 0 &&
              message.answers &&
              message.answers.map((answer, index, answersArray) => {
                const userData = participantsData.find(
                  (user) => user.user_id === answer.sender_id
                );
                const messageFullData = {
                  ...answer,
                  userData,
                  online: activeData.id_active_users.includes(answer.sender_id),
                };
                const readed = answer.read_by.includes(`${userId}`);
                return (
                  <MessageFromChat
                    message={messageFullData}
                    type="answer"
                    self={self}
                    key={`${answer.answer_id}a`}
                    lastElement={answersArray.length === index + 1}
                    readed={userId === answer.sender_id ? true : readed}
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
