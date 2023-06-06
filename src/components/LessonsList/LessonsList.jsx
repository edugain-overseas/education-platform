import React from "react";
import { ReactComponent as DetailsIcon } from "../../images/icons/details.svg";
import styles from "./LessonsList.module.scss";

export function LessonsList({ lessons }) {
  return (
    <ul className={styles.lessonsList}>
      {lessons.map((lesson) => (
        <li key={lesson.id} className={styles.lessonsItem}>
          <h3 className={styles.lessonSubject}>{lesson.subject}</h3>
          <p className={styles.lessonTime}>
            Start {lesson.startTime} - {lesson.endTime}
          </p>
          <p className={styles.lessonLecturer}>{lesson.lecturer}</p>
          <button className={styles.detailsButton}>
            <DetailsIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
