import React, { useState } from "react";
import { ReactComponent as DetailsIcon } from "../../../images/icons/details.svg";
import styles from "./LessonsList.module.scss";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { useLocation } from "react-router-dom";
import ScheduleModal from "../../shared/ScheduleModal/ScheduleModal";

export function LessonsList({ lessons }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isEdit = useSelector(getIsEdit);
  const path = useLocation().pathname;
  return (
    <>
      <ul className={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <li key={index} className={styles.lessonsItem}>
            <h3 className={styles.lessonSubject}>{lesson.subject_name}</h3>
            <p className={styles.lessonTime}>
              Start {lesson.lesson_date.slice(11, 16)} -{" "}
              {lesson.lesson_end.slice(0, -3)}
            </p>
            <p
              className={styles.lessonLecturer}
            >{`${lesson.teacher_name} ${lesson.teacher_surname}`}</p>
            <button className={styles.detailsButton}>
              <DetailsIcon />
            </button>
          </li>
        ))}
        {lessons.length <= 5 && isEdit && path !== "/" && (
          <li className={styles.lessonsAddItem}>
            <button onClick={() => setIsOpenModal(true)}>+</button>
          </li>
        )}
      </ul>
      <ScheduleModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
