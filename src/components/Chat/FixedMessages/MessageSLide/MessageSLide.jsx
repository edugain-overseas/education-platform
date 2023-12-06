import React from "react";
import styles from "./MessageSLide.module.scss";
import UserAvatar from "../../../shared/UserAvatar/UserAvatar";

const MessageSLide = ({ message, chatData }) => {
  const sender = chatData.participantsData?.find(
    ({ userId }) => userId === message.senderId
  );
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.avatarWrapper}>
        <UserAvatar imageSrc={sender?.imagePath} userName={sender?.name} />
        <div
          className={
            sender?.isActive
              ? `${styles.status} ${styles.online}`
              : `${styles.status} ${styles.offline}`
          }
        ></div>
      </div>
      <div className={styles.messageWrapper}>
        <p className={styles.senderName}>{sender?.name}</p>
        <p
          dangerouslySetInnerHTML={{ __html: message.messageText }}
          className={styles.messageText}
        ></p>
      </div>
    </div>
  );
};

export default MessageSLide;
