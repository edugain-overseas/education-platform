import React from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import styles from "./MessageFromChat.module.scss";

import user1Avatar from "../../../images/logo192.png";
import { serverName } from "../../../constants/server";


export function MessageFromChat({ message, type, self }) {
  return (
    <div
      className={
        type === "origin"
          ? `${styles.messageWrapper}`
          : `${styles.messageWrapper} ${styles.feedback}`
      }
      style={
        self ? {
          flexDirection: 'row-reverse'
        } : {}
      }
    >
      <div className={styles.avatarWrapper}>
        <img
          src={
            message.userData.ImagePath
              ? `${serverName}${message.userData.ImagePath}`
              : user1Avatar
          }
          alt="avatar"
          className={styles.avatar}
        />
        <span
          className={message.online ? `${styles.status} ${styles.online}` : `${styles.status} ${styles.offline}`}
        ></span>
      </div>
      <div className={styles.contentSubWrapper}>
        <p className={styles.userName} style={self ? {
          textAlign: 'end'
        } : {}}>
          {message.userData.Name} {message.message_datetime.slice(-8, -3)}
        </p>
        <div className={styles.contentWrapper}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: message.message_text }}
          ></div>
          <button className={styles.feedbackButton}>
            <span className={styles.feedbackButtonTitle}>Feedback</span>
            <SendFeedbackIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// {
//     id: 1,
//     message: "hello wordld",
//     gropId: 1,
//     date: moment(),
//     fixed: false,
//     senderId: 1,
//     senderType: "",
//     feedbackTo: null
//   },
