import React from "react";
import { useSelector } from "react-redux";
import { getGroupSubjects } from "../../redux/subject/subjectSelectors";
import {
  getTeacherSubjects,
  getUserType,
} from "../../redux/user/userSelectors";
import SubjectItem from "./SubjectItem/SubjectItem";
import styles from "./SubjectsList.module.scss";

export default function SubjectsList() {
  const userType = useSelector(getUserType);
  const subjectsData = useSelector(
    userType === "student" ? getGroupSubjects : getTeacherSubjects
  );
  console.log(subjectsData);

  return (
    <ul className={styles.subjectsList}>
      {subjectsData &&
        subjectsData.map((subjectData) => (
          <SubjectItem
            key={
              userType === "student" ? subjectData.id : subjectData.subject_id
            }
            subjectData={subjectData}
          />
        ))}
    </ul>
  );
}
