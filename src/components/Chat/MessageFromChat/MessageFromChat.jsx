import React from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import user1Avatar from "../../../images/logo192.png";
import { serverName } from "../../../constants/server";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../../redux/groupChat/groupChatSlice";
import { getFeedbackData } from "../../../redux/groupChat/groupChatSelectors";
import { renderFileFromMessage } from "../../../helpers/renderFileFromMessage";
import { readAnswerThunk, readMessageThunk } from "../../../redux/groupChat/groupChatOperations";
import styles from "./MessageFromChat.module.scss";

export function MessageFromChat({ message = [], type = 'origin', self = false, lastElement = false, readed = false }) {
  const dispatch = useDispatch();

  const replyTo = useSelector(getFeedbackData);

  const handleFeedback = () => {
    if (replyTo !== message.message_id) {
      dispatch(setFeedback(message.message_id));
    } else {
      dispatch(setFeedback(null));
    }
  };

  const handleMouseEnter = () => {
    if (readed) {
      return;
    }

    if (type === "origin") {
      dispatch(readMessageThunk(message.message_id));
    } else {
      dispatch(readAnswerThunk(message.answer_id));
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
        <img
          src={
            message.userData.image_path
              ? `${serverName}${message.userData.image_path}`
              : user1Avatar
          }
          alt="avatar"
          className={styles.avatar}
        />
        <span
          className={
            message.online
              ? `${styles.status} ${styles.online}`
              : `${styles.status} ${styles.offline}`
          }
        ></span>
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
