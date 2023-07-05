import React from "react";
import { useSelector } from "react-redux";
import { getUserName, getUserInfo } from "../../redux/user/userSelectors";
import { ReactComponent as SettingsIcon } from "../../images/icons/settings.svg";
import styles from "./UserPanel.module.scss";
import image from "../../images/logo192.png";

const serverName = "https://e54a-194-44-219-51.ngrok-free.app/";

export const UserPanel = () => {
  const username = useSelector(getUserName);
  const userInfo = useSelector(getUserInfo);
  const notification = 2;
  return (
    <div className={styles.wrapper}>
      <p className={styles.notification}>Notification: {notification}</p>
      <div className={styles.userWrapper}>
        <img
          src={
            userInfo?.image_path ? `${serverName}${userInfo.image_path}` : image
          }
          // src={image}
          alt="user avatar"
          className={styles.userAvatar}
        />
        <span className={styles.userName}>{username}</span>
      </div>
      <button className={styles.settingsButton}>
        <span className={styles.settings}>settings</span>
        <SettingsIcon />
      </button>
    </div>
  );
};
