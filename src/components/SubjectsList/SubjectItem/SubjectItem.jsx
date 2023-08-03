import React from "react";
import { serverName } from "../../../constants/server";
import noImage from "../../../images/noImage.jpeg";
import styles from "./SubjectItem.module.scss";
import { Link } from "react-router-dom";

export default function SubjectItem({ subjectData }) {
  return (
    <li className={styles.subjectItem}>
      <Link to={`/courses/${subjectData.id}/tapes`}>
        <img
          src={
            subjectData.image_path
              ? `${serverName}${subjectData.image_path}`
              : noImage
          }
          alt={subjectData.title}
          className={styles.subjectImage}
        />
        <div className={styles.titleWrapper}>
          <h3 className={styles.subjectTitle}>{subjectData.title}</h3>
        </div>
      </Link>
    </li>
  );
}
