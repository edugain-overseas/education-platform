import React from "react";
import { useSelector } from "react-redux";
import {
  getGroupSubjects,
  getStudentDopSubjects,
} from "../../redux/subject/subjectSelectors";
import {
  getTeacherSubjects,
  getUserType,
} from "../../redux/user/userSelectors";
import SubjectItem from "./SubjectItem/SubjectItem";
import { Empty } from "antd";
import styles from "./SubjectsList.module.scss";

export default function SubjectsList({ type }) {
  console.log(type);
  const userType = useSelector(getUserType);
  const subjectsData = useSelector(
    userType === "student" ? getGroupSubjects : getTeacherSubjects
  );
  const dopSubjects = useSelector(getStudentDopSubjects);
  console.log(subjectsData);

  const renderSubjectsList = () => {
    switch (type) {
      case "main":
        return (
          <ul className={styles.subjectsList}>
            {subjectsData &&
              subjectsData.map((subjectData) => (
                <SubjectItem
                  key={
                    userType === "student"
                      ? subjectData.id
                      : subjectData.subject_id
                  }
                  subjectData={subjectData}
                />
              ))}
          </ul>
        );
      case "studentDop":
        return dopSubjects.length !== 0 ? (
          <ul className={styles.subjectsList}>
            {dopSubjects.map((subjectData) => (
              <SubjectItem
                key={
                  userType === "student"
                    ? subjectData.id
                    : subjectData.subject_id
                }
                subjectData={subjectData}
              />
            ))}
          </ul>
        ) : (
          <Empty />
        );
      case "studentArchive":
        return <Empty />;
      case "teacherArchive":
        return <Empty />;
      default:
        break;
    }
  };

  return renderSubjectsList();
}
