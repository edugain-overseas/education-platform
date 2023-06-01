import React from "react";
import { ReactComponent as ChatIcon } from "../../images/icons/chat.svg";
import styles from './NotificationBar.module.scss'

export const NotificationBar = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.notificationWrapper}>
        <ChatIcon />
        <p>Class rooms notification</p>
      </div>
      <div className={styles.notificationWrapper}>
        <ChatIcon />
        <p>Notification from curator</p>
      </div>
      <div className={styles.notificationWrapper}>
        <ChatIcon />
        <p>Students Support Center</p>
      </div>
    </div>
  );
};
