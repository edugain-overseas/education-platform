import React, { useContext } from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../../redux/groupChat/groupChatSlice";
import { setFeedback as setSubjectFeedback } from "../../../redux/subjectChats/subjectChatSlice";
import { getFeedbackData } from "../../../redux/groupChat/groupChatSelectors";
import { renderFileFromMessage } from "../../../helpers/renderFileFromMessage";
import {
  readAnswerThunk,
  readMessageThunk,
} from "../../../redux/groupChat/groupChatOperations";
import {
  readAnswerThunk as readSubjectAnswerThunk,
  readMessageThunk as readSubjectMessageThunk,
} from "../../../redux/subjectChats/subjectChatOperations";
import { getSubjectFeedbackData } from "../../../redux/subjectChats/subjectChatSelectors";
import { TypeContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import UserAvatar from "../../shared/UserAvatar/UserAvatar";
import styles from "./MessageFromChat.module.scss";

export function MessageFromChat({
  message = [],
  type = "origin",
  self = false,
  lastElement = false,
  readed = false,
}) {
  const dispatch = useDispatch();

  const chatType = useContext(TypeContext) || "group";

  const replyTo = useSelector(
    chatType === "group" ? getFeedbackData : getSubjectFeedbackData
  );

  const handleFeedback = () => {
    if (replyTo !== message.message_id) {
      dispatch(
        chatType === "group"
          ? setFeedback(message.message_id)
          : setSubjectFeedback(message.message_id)
      );
    } else {
      dispatch(
        chatType === "group" ? setFeedback(null) : setSubjectFeedback(null)
      );
    }
  };

  const handleMouseEnter = () => {
    if (readed) {
      return;
    }

    if (type === "origin") {
      dispatch(
        chatType === "group"
          ? readMessageThunk(message.message_id)
          : readSubjectMessageThunk(message.message_id)
      );
    } else {
      dispatch(
        chatType === "group"
          ? readAnswerThunk(message.answer_id)
          : readSubjectAnswerThunk(message.answer_id)
      );
    }
  };

  return (
    <div
      className={
        type === "origin"
          ? message.answers?.length === 0
            ? self
              ? `${styles.messageWrapper} ${styles.selfMessage}`
              : `${styles.messageWrapper}`
            : self
            ? `${styles.messageWrapper} ${styles.messageWithAnswersSelf} ${styles.selfMessage}`
            : `${styles.messageWrapper} ${styles.messageWithAnswers}`
          : self
          ? `${styles.messageWrapper} ${styles.feedbackSelf} ${
              lastElement && styles.lastAnswer
            } ${styles.selfMessage}`
          : `${styles.messageWrapper} ${styles.feedback} ${
              lastElement && styles.lastAnswer
            }`
      }
      onMouseEnter={handleMouseEnter}
    >
      <div className={styles.avatarWrapper}>
        <UserAvatar
          imageSrc={message.userData.image_path}
          userName={message.userData.name}
        />
        <div
          className={
            message.online
              ? `${styles.status} ${styles.online}`
              : `${styles.status} ${styles.offline}`
          }
        ></div>
      </div>
      <div className={styles.contentSubWrapper}>
        <p
          className={styles.userName}
          style={
            self
              ? {
                  textAlign: "end",
                }
              : {}
          }
        >
          {message.userData.name}{" "}
          {type === "origin"
            ? message.message_datetime.slice(-8, -3)
            : message.answer_datetime.slice(-8, -3)}
        </p>
        <div
          className={
            readed
              ? styles.contentWrapper
              : `${styles.contentWrapper} ${styles.contentWrapperUnread}`
          }
          style={
            replyTo === message.message_id
              ? { border: "1px solid #4171CD" }
              : { border: "1px solid transparent" }
          }
        >
          {type === "origin"
            ? message.attach_files.map((file) => {
                return renderFileFromMessage(file);
              })
            : message.attach_file.map((file) => {
                return renderFileFromMessage(file);
              })}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: type === "origin" ? message.message_text : message.answer,
            }}
          ></div>
          {type === "origin" && (
            <button
              className={
                self
                  ? `${styles.feedbackButton} ${styles.feedbackButtonSelf}`
                  : styles.feedbackButton
              }
              onClick={handleFeedback}
              style={
                replyTo === message.message_id
                  ? { border: "1px solid #4171CD" }
                  : {}
              }
            >
              <span className={styles.feedbackButtonTitle}>Feedback</span>
              <SendFeedbackIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
