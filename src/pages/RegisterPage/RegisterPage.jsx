import React from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/userSelectors";
import StudentRegister from "./StudentRegister/StudentRegister";
import TeacherRegister from "./TeacherRegister/TeacherRegister";
import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const userType = useSelector(getUserType);
  return (
    <div className={styles.pageWrapper}>
      {userType === "student" ? <StudentRegister /> : <TeacherRegister />}
    </div>
  );
};

export default RegisterPage;
