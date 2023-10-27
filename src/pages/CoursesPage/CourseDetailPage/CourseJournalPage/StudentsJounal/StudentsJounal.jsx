import React from "react";
import styles from "./StudentsJounal.module.scss";
import { ReactComponent as ArrowDownIcon } from "../../../../../images/icons/editTextIcons/arrowDown.svg";

const StudentsJounal = ({
  lessonsData,
  isSortedByDate,
  sortByDate,
  isSortedByType,
  sortByType,
  isSortedByScore,
  sortByScore,
}) => {

  const renderLessonsData = () =>
    lessonsData.map(
      ({
        lesson_id: id,
        lesson_date: dateString,
        lesson_title: theme,
        lesson_type: type,
        score
      }) => (
        <li key={id} className={styles.journalBodyItem}>
          <div className={styles.date}>
            <span>{formatDateString(dateString)}</span>
          </div>
          <div className={styles.theme}>
            <span>{theme}</span>
          </div>
          <div className={styles.type}>
            <span>{type}</span>
          </div>
          <div className={styles.score}>
            <span>{`${score} (B)`}</span>
          </div>
        </li>
      )
    );

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
        <div className={styles.date}>
          <span>date</span>
          <button
            className={isSortedByDate ? styles.sorted : "default"}
            onClick={sortByDate}
          >
            <ArrowDownIcon />
          </button>
        </div>
        <div className={styles.theme}>
          <span>theme</span>
        </div>
        <div className={styles.type}>
          <span>type</span>
          <button
            className={isSortedByType ? styles.sorted : ""}
            onClick={sortByType}
          >
            <ArrowDownIcon />
          </button>
        </div>
        <div className={styles.score}>
          <span>score</span>
          <button
            className={isSortedByScore ? styles.sorted : ""}
            onClick={sortByScore}
          >
            <ArrowDownIcon />
          </button>
        </div>
      </li>
      {renderLessonsData()}
    </ul>
  );
};

export default StudentsJounal;
