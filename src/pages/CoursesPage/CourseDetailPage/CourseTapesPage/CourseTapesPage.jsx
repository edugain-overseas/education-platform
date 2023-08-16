import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getGroupSubjects,
  getSubjectData,
} from "../../../../redux/subject/subjectSelectors";
import SubjectInfoPanel from "../../../../components/SubjectInfoPanel/SubjectInfoPanel";
import { Chat } from "../../../../components/Chat/Chat";
import ProgressPanel from "../../../../components/ProgressPanel/ProgressPanel";
import styles from "./CourseTapesPage.module.scss";

export default function CourseTapesPage() {
  const { id } = useParams();

  const subjectData = {
    ...useSelector(getSubjectData)?.find((subject) => `${subject.id}` === id),
    ...useSelector(getGroupSubjects).find((subject) => `${subject.id}` === id),
  };

  return (
    <div className={styles.pageWrapper}>
      <SubjectInfoPanel subjectData={subjectData}/>
      <Chat />
      <ProgressPanel subjectData={subjectData}/>
    </div>
  );
}
