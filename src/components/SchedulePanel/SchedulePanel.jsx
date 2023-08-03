import React from "react";
import { useState } from "react";
import moment from "moment";
import { LessonsList } from "./LessonsList/LessonsList";
import { ReactComponent as ShowMoreIcon } from "../../images/icons/show-more.svg";
import { ReactComponent as ShowLessIcon } from "../../images/icons/show-less.svg";
import styles from "./SchedulePanel.module.scss";
import { useSelector } from "react-redux";
import {
  getSchedule,
  isScheduleLoading,
} from "../../redux/schedule/scheduleSelectors";
import MutationDots from "../Loaders/MutationDots/MutationDots";
import DayDisplay from "../shared/DayDisplay/DayDisplay";

export function SchedulePanel() {
  const [isShownMore, setIsShownMore] = useState(false);
  const nextThreeDays = [moment(), moment().add(1, "d"), moment().add(2, "d")];

  const isLoading = useSelector(isScheduleLoading);
  const schedule = useSelector(getSchedule);

  const getLessonsForOneDay = (day) => {
    if (schedule) {
      return schedule.filter(
        (lesson) =>
          lesson.lesson_date.split("T")[0] === day.format("YYYY-MM-DD")
      );
    }
  };
  return (
    <div
      className={
        isShownMore
          ? `${styles.mainWrapper} ${styles.shownMore}`
          : styles.mainWrapper
      }
    >
      {isLoading ? (
        <MutationDots />
      ) : (
        <>
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
                <DayDisplay day={day} styles={styles}/>
                {schedule && <LessonsList lessons={getLessonsForOneDay(day)} />}
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
        </>
      )}
    </div>
  );
}
