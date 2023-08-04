import React from "react";
import { useSelector } from "react-redux";
import { getUserName, getUserInfo, getUserType } from "../../../redux/user/userSelectors";
import { ReactComponent as SettingsIcon } from "../../../images/icons/settings.svg";
import { serverName } from "../../../constants/server";
import NotificationButton from "./NotificationButton/NotificationButton";
import image from "../../../images/logo192.png";
import styles from "./UserPanel.module.scss";


export const UserPanel = () => {
  const username = useSelector(getUserName);
  const userInfo = useSelector(getUserInfo);
  const userType = useSelector(getUserType)

  return (
    <div className={styles.wrapper}>
      <NotificationButton/>
      <div className={styles.userWrapper}>
        <img
          src={
            userInfo?.image_path ? `${serverName}${userInfo.image_path}` : image
          }
          alt="user avatar"
          className={styles.userAvatar}
        />
        <span className={styles.userName}>{username}</span>
      </div>
      {userType !== 'student' && <button className={styles.settingsButton}>
        <span className={styles.settings}>settings</span>
        <SettingsIcon />
      </button>}
    </div>
  );
};
