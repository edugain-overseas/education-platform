import React, { useEffect, useState } from "react";
import styles from "./UserInfoPanel.module.scss";
import avatar from "../../images/login-bg.png";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/userSelectors";
import { AvatarUpload } from "./UploadAvatar/UploadAvatar";

const serverName = "https://e54a-194-44-219-51.ngrok-free.app/";

export function UserInfoPanel() {
  const [avatarSrc, setAvatarSrc] = useState("");
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    if (userInfo?.image_path) {
      setAvatarSrc(`${serverName}${userInfo.image_path}`);
    }
  }, [userInfo]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={avatarSrc !== "" ? avatarSrc : avatar}
            // src={avatar}
            alt="user avatar"
            className={styles.avatar}
          />
          <AvatarUpload />
        </div>
        <p
          className={styles.userName}
        >{`${userInfo?.student_name} ${userInfo?.student_surname}`}</p>
        <p
          className={styles.eduProgress}
        >{`${userInfo?.course_number} course, ${userInfo?.semester_number} semester`}</p>
      </div>
      <ul className={styles.eduInfoList}>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Group:</p>
          <p className={styles.eduInfoValue}>{userInfo?.group_name}</p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Programme Subject Area:</p>
          <p className={styles.eduInfoValue}>
            {userInfo?.student_subject_area}
          </p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Educational programme:</p>
          <p className={styles.eduInfoValue}>
            {userInfo?.student_educational_program}
          </p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Qualification:</p>
          <p className={styles.eduInfoValue}>
            {userInfo?.student_qualification}
          </p>
        </li>
        <li className={styles.eduInfoItem}>
          <p className={styles.eduInfoProperty}>Field of study:</p>
          <p className={styles.eduInfoValue}>Health</p>
        </li>
      </ul>
    </div>
  );
}
