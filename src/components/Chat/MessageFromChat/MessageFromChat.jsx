import React, { useContext } from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../../redux/groupChat/groupChatSlice";
import { setFeedback as setSubjectFeedback } from "../../../redux/subjectChats/subjectChatSlice";
import { setFeedback as setTeacherSubjectFeedback } from "../../../redux/chats/chatsSlice";
import { renderFileFromMessage } from "../../../helpers/renderFileFromMessage";
import {
  readAnswerThunk,
  readMessageThunk,
} from "../../../redux/groupChat/groupChatOperations";
import {
  readAnswerThunk as readSubjectAnswerThunk,
  readMessageThunk as readSubjectMessageThunk,
} from "../../../redux/subjectChats/subjectChatOperations";
import {
  readAnswerThunk as readTeacherSubjectAnswerThunk,
  readMessageThunk as readTeacherSubjectMessageThunk,
} from "../../../redux/chats/chatOperations";
import { TypeContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import UserAvatar from "../../shared/UserAvatar/UserAvatar";
import styles from "./MessageFromChat.module.scss";
import { getUserType } from "../../../redux/user/userSelectors";

export function MessageFromChat({
  message = [],
  type = "origin",
  self = false,
  lastElement = false,
  readed = false,
  chatData,
}) {
  const dispatch = useDispatch();

  const chatType = useContext(TypeContext) || "main";

  const replyTo = chatData?.feedbackTo;

  const userType = useSelector(getUserType);

  const handleFeedback = () => {
    if (replyTo !== message.messageId) {
      dispatch(
        chatType === "main"
          ? userType === "teacher"
            ? setTeacherSubjectFeedback({
                subjectId: chatData.subjectId,
                data: message.messageId,
              })
            : setFeedback(message.messageId)
          : setSubjectFeedback(message.messageId)
      );
    } else {
      dispatch(
        chatType === "main"
          ? userType === "teacher"
            ? setTeacherSubjectFeedback({
                subjectId: chatData.subjectId,
                data: null,
              })
            : setFeedback(null)
          : setSubjectFeedback(null)
      );
    }
  };

  const handleMouseEnter = () => {
    if (readed) {
      return;
    }

    if (type === "origin") {
      dispatch(
        chatType === "main"
          ? userType === "teacher"
            ? readTeacherSubjectMessageThunk({
                subjectId: chatData.subjectId,
                data: message.messageId,
              })
            : readMessageThunk(message.messageId)
          : readSubjectMessageThunk(message.messageIdchat)
      );
    } else {
      console.log(chatData);
      dispatch(
        chatType === "main"
          ? userType === "teacher"
            ? readTeacherSubjectAnswerThunk({
                subjectId: chatData.subjectId,
                data: message.answerId,
              })
            : readAnswerThunk(message.answerId)
          : readSubjectAnswerThunk(message.answerId)
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
          imageSrc={message.userData?.imagePath}
          userName={message.userData?.name}
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
          {message.userData?.name}{" "}
          {type === "origin"
            ? message.messageDatetime?.slice(-8, -3)
            : message.answerDatetime?.slice(-8, -3)}
        </p>
        <div
          className={
            readed
              ? styles.contentWrapper
              : `${styles.contentWrapper} ${styles.contentWrapperUnread}`
          }
          style={
            replyTo && replyTo === message.messageId
              ? { border: "1px solid #4171CD" }
              : { border: "1px solid transparent" }
          }
        >
          {type === "origin"
            ? message.attachFiles?.map((file) => {
                return renderFileFromMessage(file, styles);
              })
            : message.attachFiles?.map((file) => {
                return renderFileFromMessage(file, styles);
              })}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: type === "origin" ? message?.messageText : message?.answer,
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
                replyTo === message?.messageId
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
