import React from "react";
import styles from "./UserInfoPanel.module.scss";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/userSelectors";
import { AvatarUpload } from "./UploadAvatar/UploadAvatar";
import UserAvatar from "../shared/UserAvatar/UserAvatar";

export function UserInfoPanel() {
  const userInfo = useSelector(getUserInfo);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.imageWrapper}>
          <UserAvatar
            imageSrc={userInfo?.image_path}
            userName={userInfo?.student_name}
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
