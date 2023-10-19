import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { dateFormatString } from "../../../../../constants/dateFormats";
import { getIconByLessonType } from "../../../../../helpers/getIconByLessonType";
import DayDisplay from "../../../../shared/DayDisplay/DayDisplay";
import styles from "./LessonCardItem.module.scss";

export default function LessonCardItem({ lesson }) {
  const day = moment(lesson.lesson_date, dateFormatString);

  return (
    <li className={styles.lessonCard}>
      <Link to={`${lesson.lesson_id}`}>
        <div className={styles.cardHeader}>
          <div className={styles.lessonTypeWrapper}>
            {getIconByLessonType(lesson.lesson_type)}
            <h4 className={styles.lessonType}>{lesson.lesson_type}</h4>
          </div>
          <DayDisplay day={day} styles={styles} />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.lessonTime}>
            Start {lesson.lesson_date.slice(11, 16)} -{" "}
            {lesson.lesson_end.slice(0, -3)}
          </p>
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
        </div>
      </Link>
    </li>
  );
}
