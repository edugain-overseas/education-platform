import React from "react";
import { LessonsList } from "../../components/LessonsList/LessonsList";
import styles from "./SchedulePage.module.scss";
import moment from "moment";

export function SchedulePage() {
  const nextFiveDays = [
    moment(),
    moment().add(1, "d"),
    moment().add(2, "d"),
    moment().add(3, "d"),
    moment().add(4, "d"),
  ];
  const lessons = [
    {
      id: 1,
      date: "2023-06-09",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 2,
      date: "2023-06-09",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 3,
      date: "2023-06-09",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 4,
      date: "2023-06-09",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 5,
      date: "2023-06-09",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 6,
      date: "2023-06-10",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 7,
      date: "2023-06-10",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 8,
      date: "2023-06-10",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 9,
      date: "2023-06-11",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 10,
      date: "2023-06-11",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 11,
      date: "2023-06-11",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 12,
      date: "2023-06-11",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 13,
      date: "2023-06-12",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 14,
      date: "2023-06-12",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 15,
      date: "2023-06-12",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 16,
      date: "2023-06-13",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 17,
      date: "2023-06-13",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
    {
      id: 18,
      date: "2023-06-18",
      startTime: "10:10",
      endTime: "12:10",
      subject: "Bio-chemistry",
      lecturer: "Galliy Bogdan Viktorovich",
    },
  ];

  const getLessonsForOneDay = (day) =>
    lessons.filter((lesson) => lesson.date === day.format("YYYY-MM-DD"));

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.subWrapper}>
        {nextFiveDays.map((day) => (
          <div key={day} className={styles.dayScheduleWrapper}>
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
    </div>
  );
}
