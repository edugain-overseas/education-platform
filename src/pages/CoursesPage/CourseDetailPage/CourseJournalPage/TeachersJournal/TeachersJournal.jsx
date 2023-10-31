import React from "react";
import { useSelector } from "react-redux";
import { getSubjectsParticipants } from "../../../../../redux/subject/subjectSelectors";
import styles from "./TeachersJournal.module.scss";
import { useParams } from "react-router-dom";

const TeachersJournal = ({ lessonsData }) => {
  const { id: subjectId } = useParams();
  const students =
    useSelector(getSubjectsParticipants).find((item) => +item.id === +subjectId)
      ?.data?.students || [];
  console.log(lessonsData);

  const renderLessonsData = () =>
    lessonsData.map(
      ({
        lesson_id: id,
        lesson_date: dateString,
        lesson_type: type,
        lesson_number: number,
      }) => (
        <div
          className={
            type === "module_control"
              ? `${styles.lesson} ${styles.module}`
              : styles.lesson
          }
          key={id}
        >
          <span>{formatDateString(dateString)}</span>
          <span>
            {type} №{number}
          </span>
        </div>
      )
    );

  const renderStudents = () =>
    students.map(({ id, name, surname }) => (
      <li key={id} className={styles.journalBodyItem}>
        <div className={styles.dateAdded}>
          <span>21.06.2023</span>
        </div>
        <div className={styles.fullName}>
          <span>
            {name} {surname}
          </span>
        </div>
        {lessonsData.map(
          ({ lesson_id: id, lesson_type: type, score }, index) => (
            <div
              key={id}
              className={
                type === "module_control"
                  ? `${styles.lesson} ${styles.module}`
                  : styles.lesson
              }
            >
              <span>
                {type === "lecture" ? "PRES" : `${score + index} (B)`}
              </span>
            </div>
          )
        )}
      </li>
    ));

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${`${day}`.length === 2 ? day : `0${day}`}.${
      `${month}`.length === 2 ? month : `0${month}`
    }.${year}`;
  };

  return (
    <ul className={styles.journalBody}>
      <li className={styles.journalHeader}>
        <div className={styles.dateAdded}>
          <span>Date added</span>
        </div>
        <div className={styles.studentName}>
          <span>Student</span>
        </div>
        {renderLessonsData()}
      </li>
      {renderStudents()}
      {renderStudents()}
      {renderStudents()}
      {renderStudents()}
      {renderStudents()}
    </ul>
  );
};

export default TeachersJournal;
