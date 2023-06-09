import React from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import styles from "./MessageFromChat.module.scss";

import user1Avatar from "../../../images/logo192.png";
import user2Avatar from "../../../images/login-bg.png";

const users = [
  {
    id: 1,
    username: "John Doe",
    userAvatar: user1Avatar,
    isOnline: true,
  },
  {
    id: 2,
    username: "Jane Doe",
    userAvatar: user2Avatar,
    isOnline: false,
  },
];

export function MessageFromChat({ message, type }) {
  return (
    <div
      className={
        type === "origin"
          ? `${styles.messageWrapper}`
          : `${styles.messageWrapper} ${styles.feedback}`
      }
    >
      <div className={styles.avatarWrapper}>
        <img
          src={users.find((user) => user.id === message.senderId).userAvatar}
          alt="/"
          className={styles.avatar}
        />
        <span
          className={
            users.find((user) => user.id === message.senderId).isOnline
              ? styles.online
              : styles.offline
          }
        ></span>
      </div>
      <div className={styles.contentSubWrapper}>
        <p className={styles.userName}>
          {users.find((user) => user.id === message.senderId).username},{" "}
          {message.date.format("HH:mm")}
        </p>
        <div className={styles.contentWrapper}>
          <p className={styles.content}>{message.content}</p>
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
