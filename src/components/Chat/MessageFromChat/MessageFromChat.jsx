import React from "react";
import { ReactComponent as SendFeedbackIcon } from "../../../images/icons/feedback.svg";
import styles from "./MessageFromChat.module.scss";

import user1Avatar from "../../../images/logo192.png";
import { serverName } from "../../../constants/server";
import { getFileType } from "../../../helpers/getFileType";
import ReactPlayer from "react-player";

const fileFromMessage = (file) => {
  switch (getFileType(file.file_path)) {
    case "image":
      return (
        <img
          key={file.fileId}
          src={`${serverName}${file.file_path}`}
          alt="from chat"
          width="100%"
          height="auto"
        />
      );
    case "video":
      return (
        <ReactPlayer
          key={file.fileId}
          url={`${serverName}${file.file_path}`}
          controls={true}
          width="100%"
          height="auto"
        />
      );
    default:
      console.log(getFileType(file.file_path));
      return;
  }
};

export function MessageFromChat({ message, type, self }) {
  // console.log(message);
  return (
    <div
      className={
        type === "origin"
          ? `${styles.messageWrapper}`
          : `${styles.messageWrapper} ${styles.feedback}`
      }
      style={
        self
          ? {
              flexDirection: "row-reverse",
            }
          : {}
      }
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
          {message.userData.name} {message.message_datetime.slice(-8, -3)}
        </p>
        <div className={styles.contentWrapper}>
          {message.attach_files.length !== 0 &&
            message.attach_files.map((file) => {
              return fileFromMessage(file);
              // return (
              //   <img
              //     key={file.fileId}
              //     src={`${serverName}${file.file_path}`}
              //     alt="from chat"
              //     width="100%"
              //     height="auto"
              //   />
              // );
            })}
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
