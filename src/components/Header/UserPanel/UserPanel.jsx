import React from "react";
import { useSelector } from "react-redux";
import {
  getUserName,
  getUserInfo,
  getUserType,
} from "../../../redux/user/userSelectors";
import { ReactComponent as SettingsIcon } from "../../../images/icons/settings.svg";
// import { serverName } from "../../../constants/server";
import NotificationButton from "./NotificationButton/NotificationButton";
// import image from "../../../images/logo192.png";
import { getIsEdit } from "../../../redux/config/configSelectors";
import {
  setDefault,
  setEdit,
  setSumbit,
} from "../../../redux/config/configSlice";
import { useDispatch } from "react-redux";
import { getIsLoading } from "../../../redux/subject/subjectSelectors";
// import { useLocation } from "react-router-dom";
import UserAvatar from "../../shared/UserAvatar/UserAvatar";
import styles from "./UserPanel.module.scss";

export const UserPanel = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUserName);
  const userInfo = useSelector(getUserInfo);
  const userType = useSelector(getUserType);
  const isEdit = useSelector(getIsEdit);
  const isLoading = useSelector(getIsLoading);
  // const { pathname } = useLocation();

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }
    dispatch(setSumbit());
    // if (pathname === "/" ) {
    dispatch(setDefault());
    // return;
    // }
  };

  return (
    <div className={styles.wrapper}>
      <NotificationButton />
      <div className={styles.userWrapper}>
        <div className={styles.userAvatarWrapper}>
          <UserAvatar imageSrc={userInfo?.image_path} userName={username} />
        </div>
        <span className={styles.userName}>{username}</span>
      </div>
      {userType !== "qweqwe" &&
        (!isEdit ? (
          <button
            className={styles.settingsButton}
            onClick={() => dispatch(setEdit())}
          >
            <span className={styles.settings}>settings</span>
            <SettingsIcon />
          </button>
        ) : (
          <button
            className={
              isLoading
                ? `${styles.animate} ${styles.settingsButton} ${styles.edit}`
                : `${styles.settingsButton} ${styles.edit}`
            }
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className={styles.settings}>settings</span>
            <SettingsIcon />
          </button>
        ))}
    </div>
  );
};
