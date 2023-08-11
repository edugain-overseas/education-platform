import React from "react";
import { LessonsList } from "../../components/SchedulePanel/LessonsList/LessonsList";
import moment from "moment";
import DayDisplay from "../../components/shared/DayDisplay/DayDisplay";
import { useSelector } from "react-redux";
import { getSchedule } from "../../redux/schedule/scheduleSelectors";
import styles from "./SchedulePage.module.scss";

export function SchedulePage() {
  const nextFiveDays = [
    moment(),
    moment().add(1, "d"),
    moment().add(2, "d"),
    moment().add(3, "d"),
    moment().add(4, "d"),
  ];
  const lessons = useSelector(getSchedule);

  const getLessonsForOneDay = (day) => {
    if (!lessons) {
      return [];
    }
    return lessons.filter(
      (lesson) => lesson.lesson_date.slice(0, 10) === day.format("YYYY-MM-DD")
    );
  };
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.subWrapper}>
        {nextFiveDays.map((day) => (
          <div key={day} className={styles.dayScheduleWrapper}>
            <DayDisplay day={day} styles={styles} />
            <LessonsList lessons={getLessonsForOneDay(day)} />
          </div>
        ))}
      </div>
    </div>
  );
}
