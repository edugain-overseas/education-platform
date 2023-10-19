import React, { useState } from "react";
import { ReactComponent as DetailsIcon } from "../../../images/icons/details.svg";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import LessonAddModal from "../../shared/LessonAddModal/LessonAddModal";
import { getUserType } from "../../../redux/user/userSelectors";
import styles from "./LessonsList.module.scss";

export function LessonsList({ lessons, day }) {
  console.log(lessons);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isEdit = useSelector(getIsEdit);
  const userType = useSelector(getUserType);
  const disabledSlots = lessons.map(
    ({ lesson_date, lesson_end }) =>
      `${lesson_date.split("T")[1].slice(0, 5)} - ${lesson_end.slice(0, 5)}`
  );

  return (
    <>
      <ul className={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <li key={index} className={styles.lessonsItem}>
            <h3 className={styles.lessonSubject}>{lesson.subject_name}</h3>
            {userType === "student" ? (
              <div>
                <p className={styles.infoText}>
                  <span>Tema: </span>
                  {lesson.lesson_name}
                </p>
                <p className={styles.infoText}>
                  Start {lesson.lesson_date.slice(11, 16)} -{" "}
                  {lesson.lesson_end.slice(0, -3)}
                </p>
                <p
                  className={styles.infoText}
                >{`${lesson.teacher_name} ${lesson.teacher_surname}`}</p>
              </div>
            ) : (
              <div className={styles.teacherInfoWrapper}>
                <p className={styles.infoText}>
                  <span>Tema: </span>
                  {lesson.lesson_name}
                </p>
                <p className={styles.infoText}>
                  Start {lesson.lesson_date.slice(11, 16)} -{" "}
                  {lesson.lesson_end.slice(0, -3)}
                </p>
                <p className={styles.infoText}>Group: {lesson.group_name}</p>
              </div>
            )}
            <button className={styles.detailsButton}>
              <DetailsIcon />
            </button>
          </li>
        ))}
        {lessons.length < 5 && isEdit && (
          <li className={styles.lessonsAddItem}>
            <button onClick={() => setIsOpenModal(true)}>+</button>
          </li>
        )}
      </ul>
      <LessonAddModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        day={day}
        disabledSlots={disabledSlots}
      />
    </>
  );
}
