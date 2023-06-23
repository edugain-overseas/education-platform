import React from "react";
import styles from "./UserInfoPanel.module.scss";
import avatar from "../../images/login-bg.png";
// import { AvatarUpload } from "./UploadAvatar/UploadAvatar";

export function UserInfoPanel() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.imageWrapper}>
          <img src={avatar} alt="user avatar" className={styles.avatar} />
          {/* <div>
            <AvatarUpload />
          </div> */}
        </div>
        <p className={styles.userName}>Sam James</p>
        <p className={styles.eduProgress}>1 course, 2 semester</p>
      </div>
      <ul className={styles.eduInfoList}>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Group:</p>
          <p className={styles.eduInfoValue}>2023-01D</p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Programme Subject Area:</p>
          <p className={styles.eduInfoValue}>Medicine</p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Educational programme:</p>
          <p className={styles.eduInfoValue}>Physician</p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Qualification:</p>
          <p className={styles.eduInfoValue}>Master's degree</p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Field of study:</p>
          <p className={styles.eduInfoValue}>Health</p>
        </li>
      </ul>
    </div>
  );
}
