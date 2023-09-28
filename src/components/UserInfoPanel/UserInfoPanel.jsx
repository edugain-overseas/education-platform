import React from "react";
import styles from "./UserInfoPanel.module.scss";
import { useSelector } from "react-redux";
import { getIsLoading, getUserInfo } from "../../redux/user/userSelectors";
import { AvatarUpload } from "./UploadAvatar/UploadAvatar";
import UserAvatar from "../shared/UserAvatar/UserAvatar";
import { TailSpin } from "react-loader-spinner";

export function UserInfoPanel() {
  const userInfo = useSelector(getUserInfo);
  const isUserLoading = useSelector(getIsLoading);
  // const isUserLoading = true

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.imageWrapper}>
          <UserAvatar
            imageSrc={userInfo?.image_path}
            userName={userInfo?.student_name}
          />
          {isUserLoading ? (
            <TailSpin
              height="100%"
              width="100%"
              color="#4171cd"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
              
              wrapperClass={styles.loader}
            />
          ) : (
            <AvatarUpload />
          )}
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
