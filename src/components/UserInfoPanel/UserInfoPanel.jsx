import React from "react";
import { useSelector } from "react-redux";
import {
  getIsLoading,
  getUserInfo,
  getUserType,
} from "../../redux/user/userSelectors";
import { AvatarUpload } from "./UploadAvatar/UploadAvatar";
import { TailSpin } from "react-loader-spinner";
import UserAvatar from "../shared/UserAvatar/UserAvatar";
import styles from "./UserInfoPanel.module.scss";

export function UserInfoPanel() {
  const userInfo = useSelector(getUserInfo);
  const isUserLoading = useSelector(getIsLoading);
  const userType = useSelector(getUserType);
  // const userType = 'student';

  const renderUserMainInfo = () => {
    switch (userType) {
      case "student":
        return (
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
        );
      case "teacher":
        return (
          <div className={styles.userInfoWrapper}>
            <div className={styles.imageWrapper}>
              <UserAvatar
                imageSrc={userInfo?.image_path}
                userName={userInfo?.teacher_name}
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
            >{`${userInfo?.teacher_name} ${userInfo?.teacher_surname}`}</p>
            <p
              className={styles.eduProgress}
            >{`Email: ${userInfo?.teacher_email}`}</p>
          </div>
        );
      default:
        break;
    }
  };

  const renderUserEduInfo = () => {
    if (userType === "student") {
      return (
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
      );
    }
  };

  return (
    <div className={styles.mainWrapper}>
      {renderUserMainInfo()}
      {renderUserEduInfo()}
    </div>
  );
}
