import React from "react";
import { serverName } from "../../../constants/server";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserType } from "../../../redux/user/userSelectors";
import noImage from "../../../images/noImage.jpeg";
import styles from "./SubjectItem.module.scss";

export default function SubjectItem({ subjectData }) {
  const userType = useSelector(getUserType);
  return (
    <li className={styles.subjectItem}>
      <Link
        to={`/courses/${
          userType === "student" ? subjectData.id : subjectData.subject_id
        }/tapes`}
      >
        <img
          src={
            subjectData.image_path
              ? `${serverName}${subjectData.image_path}`
              : noImage
          }
          alt={
            userType === "student"
              ? subjectData.title
              : subjectData.subject_title
          }
          className={styles.subjectImage}
        />
        <div className={styles.titleWrapper}>
          <h3 className={styles.subjectTitle}>
            {userType === "student"
              ? subjectData.title
              : subjectData.subject_title}
          </h3>
        </div>
      </Link>
    </li>
  );
}
