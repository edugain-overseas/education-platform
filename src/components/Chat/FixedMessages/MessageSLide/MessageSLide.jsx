import React from "react";
import { useSelector } from "react-redux";
import { getParticipantsData } from "../../../../redux/groupChat/groupChatSelectors";
import styles from "./MessageSLide.module.scss";
import UserAvatar from "../../../shared/UserAvatar/UserAvatar";

const MessageSLide = ({ message }) => {
  const sender = useSelector(getParticipantsData)?.find(
    ({ user_id }) => user_id === message.sender_id
  );

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.avatarWrapper}>
        <UserAvatar imageSrc={sender.image_path} userName={sender.username} />
        <div
          className={
            sender.is_active
              ? `${styles.status} ${styles.online}`
              : `${styles.status} ${styles.offline}`
          }
        ></div>
      </div>
      <div className={styles.messageWrapper}>
        <p className={styles.senderName}>{sender.name}</p>
        <p
          dangerouslySetInnerHTML={{ __html: message.message_text }}
          className={styles.messageText}
        ></p>
      </div>
    </div>
  );
};

export default MessageSLide;
