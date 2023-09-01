import React from "react";
import { useSelector } from "react-redux";
import { getGroupSubjects } from "../../redux/subject/subjectSelectors";
import SubjectItem from "./SubjectItem/SubjectItem";
import styles from "./SubjectsList.module.scss";

export default function SubjectsList() {
  const subjectsData = useSelector(getGroupSubjects);

  return (
    <ul className={styles.subjectsList}>
      {subjectsData &&
        subjectsData.map((subjectData) => (
          <SubjectItem key={subjectData.id} subjectData={subjectData} />
        ))}
    </ul>
  );
}
