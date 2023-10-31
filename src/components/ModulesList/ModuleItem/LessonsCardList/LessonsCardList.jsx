import React, { useState } from "react";
import { useSelector } from "react-redux";
import LessonCardItem from "./LessonCardItem/LessonCardItem";
import LessonAddModal from "../../../shared/LessonAddModal/LessonAddModal";
import { getIsEdit } from "../../../../redux/config/configSelectors";
import styles from "./LessonsCardList.module.scss";

export default function LessonsCardList({ lessons }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isEdit = useSelector(getIsEdit);
  return (
    <>
      <ul className={styles.lessonsCardList}>
        {lessons.map((lesson) => (
          <LessonCardItem key={lesson.lesson_id} lesson={lesson} />
        ))}
        {isEdit && (
          <li className={styles.lessonsAddItem}>
            <button onClick={() => setIsOpenModal(true)}>+</button>
          </li>
        )}
      </ul>
      <LessonAddModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
