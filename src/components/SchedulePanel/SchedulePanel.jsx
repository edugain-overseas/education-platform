import React from "react";
import { useState } from "react";
import moment from "moment";
import { LessonsList } from "../LessonsList/LessonsList";
import { ReactComponent as ShowMoreIcon } from "../../images/icons/show-more.svg";
import { ReactComponent as ShowLessIcon } from "../../images/icons/show-less.svg";
import styles from "./SchedulePanel.module.scss";

export function SchedulePanel() {
  const [isShownMore, setIsShownMore] = useState(true);
  const nextThreeDays = [moment(), moment().add(1, "d"), moment().add(2, "d")];

  const lessons = [
    {
      id: 1,
      date: "2023-06-06",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 2,
      date: "2023-06-06",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 3,
      date: "2023-06-06",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 4,
      date: "2023-06-06",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 5,
      date: "2023-06-06",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 6,
      date: "2023-06-07",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 7,
      date: "2023-06-07",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 8,
      date: "2023-06-07",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 9,
      date: "2023-06-08",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 10,
      date: "2023-06-08",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 11,
      date: "2023-06-08",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 12,
      date: "2023-06-08",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
  ];

  const getLessonsForOneDay = (day) =>
    lessons.filter((lesson) => lesson.date === day.format("YYYY-MM-DD"));

  return (
    <div
      className={
        isShownMore
          ? `${styles.mainWrapper} ${styles.shownMore}`
          : styles.mainWrapper
      }
    >
      <h2 className={styles.title}>Schedule</h2>
      <div className={styles.scheduleWrapper}>
        {nextThreeDays.map((day) => (
          <div
            key={day}
            className={
              isShownMore
                ? `${styles.dayScheduleWrapper} ${styles.dayShownMore}`
                : styles.dayScheduleWrapper
            }
          >
            <div className={styles.dateWrapper}>
              <p className={styles.dayInfo}>{day.format("DD")} /</p>
              <div className={styles.dateSubWrapper}>
                <p className={styles.monthInfo}>{day.format("MM")}</p>
                <p className={styles.dayOfWeekInfo}>{day.format("dddd")}</p>
              </div>
            </div>
            <LessonsList lessons={getLessonsForOneDay(day)} />
          </div>
        ))}
      </div>
      {isShownMore ? (
        <button
          className={styles.toggleButton}
            onClick={() => setIsShownMore(false)}
          >
          <ShowLessIcon />
        </button>
      ) : (
        <button
          className={styles.toggleButton}
          onClick={() => setIsShownMore(true)}
        >
          <ShowMoreIcon />
        </button>
      )}
    </div>
  );
}
