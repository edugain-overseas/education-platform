import React from "react";
import { useSelector } from "react-redux";
import { getSubjectsParticipants } from "../../../../redux/subject/subjectSelectors";
import styles from "./CourseParticipantPage.module.scss";
import { useParams } from "react-router-dom";

export default function CourseParticipantPage() {
  const { id } = useParams();
  const participantsData = useSelector(getSubjectsParticipants).find(
    (item) => item.id === id
  )?.data;
  console.log(participantsData);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>participants</h1>
        <div className={styles.teachersWrapper}>
          <div className={styles.headerWrapper}>
            <span>Teachers and curators</span>
            <span>
              {participantsData?.teachers &&
                `(${
                  participantsData.teachers.length +
                  (participantsData.curator ? 1 : 0)
                })`}
              Teachers and curators
            </span>
          </div>
          <ul className={styles.teacherList}>
            <li className={styles.teachersItemHeader}>
              <div>Name</div>
              <div>Email</div>
              <div>Activity</div>
            </li>
            {participantsData?.teachers &&
              participantsData?.teachers.map((teacher) => (
                <li key={teacher.id} className={styles.teacherItemBody}>
                  <div
                    className={styles.teacherName}
                  >{`${teacher.name} ${teacher.surname}`}</div>
                  <div className={styles.teacherEmail}>{teacher.email}</div>
                  <div>-</div>
                </li>
              ))}
            <li className={styles.teacherItemBody}>
              <div
                className={styles.teacherName}
              >{`${participantsData.curator.name} ${participantsData.curator.surname}`}</div>
              <div className={styles.teacherEmail}>
                {participantsData.curator.email}
              </div>
              <div>-</div>
            </li>
          </ul>
        </div>
        <div className={styles.studentsWrapper}>
          <div className={styles.headerWrapper}>
            <span>Students</span>
            <span>
              {participantsData?.students &&
                `(${participantsData.students.length})`}
              Students
            </span>
          </div>
          <ul className={styles.teacherList}>
            <li className={styles.teachersItemHeader}>
              <div>Name</div>
              <div>Email</div>
              <div>Activity</div>
              <div>Activity</div>
              <div>Activity</div>
            </li>
            {participantsData?.teachers &&
              participantsData?.teachers.map((teacher) => (
                <li key={teacher.id} className={styles.teacherItemBody}>
                  <div
                    className={styles.teacherName}
                  >{`${teacher.name} ${teacher.surname}`}</div>
                  <div className={styles.teacherEmail}>{teacher.email}</div>
                  <div>-</div>
                </li>
              ))}
            <li className={styles.teacherItemBody}>
              <div
                className={styles.teacherName}
              >{`${participantsData.curator.name} ${participantsData.curator.surname}`}</div>
              <div className={styles.teacherEmail}>
                {participantsData.curator.email}
              </div>
              <div>-</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
