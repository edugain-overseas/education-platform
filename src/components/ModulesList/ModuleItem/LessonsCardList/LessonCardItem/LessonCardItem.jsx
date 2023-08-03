import React from "react";
import moment from "moment";
import styles from "./LessonCardItem.module.scss";
import DayDisplay from "../../../../shared/DayDisplay/DayDisplay";
import { dateFormatString } from "../../../../../constants/dateFormats";
import { getIconByLessonType } from "../../../../../helpers/getIconByLessonType";

export default function LessonCardItem({ lesson }) {
  const day = moment(lesson.lesson_date, dateFormatString);

  return (
    <li className={styles.lessonCard}>
      <div className={styles.cardHeader}>
        <div className={styles.lessonTypeWrapper}>
          {getIconByLessonType(lesson.lesson_type)}
          <h4 className={styles.lessonType}>{lesson.lesson_type}</h4>
        </div>
        <DayDisplay day={day} styles={styles} />
      </div>
      <h5 className={styles.lessonTitle}>
        <span>Theme: </span>
        {lesson.lesson_title}
      </h5>
      {lesson.lesson_desc && (
        <p className={styles.lessonDesc}>
          <span>Description: </span>
          {lesson.lesson_desc}
        </p>
      )}
    </li>
  );
}
