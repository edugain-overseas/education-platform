import React from "react";
import styles from "./SubjectInfoPanel.module.scss";
import defaultImage from "../../images/noImage.jpeg";
import { Link } from "react-router-dom";
import { ReactComponent as CheckedIcon } from "../../images/icons/checked.svg";
import { useSelector } from "react-redux";

import { getUserGroup } from "../../redux/user/userSelectors";
import { serverName } from "../../constants/server";

export default function SubjectInfoPanel({subjectData}) {
  
  const groupName = useSelector(getUserGroup);

  return (
    <div className={styles.mainWrapper}>
      <div>
        <div className={styles.imageWrapper}>
          <img
            src={
              subjectData.image_path
                ? `${serverName}${subjectData.image_path}`
                : defaultImage
            }
            alt="/"
          />
          <h3 className={styles.groupName}>{groupName}</h3>
        </div>
        <div className={styles.mainInfoWrapper}>
          <h2 className={styles.title}>{subjectData.title}</h2>
          {subjectData.subject_teachers && (
            <ul className={styles.teachers}>
              {subjectData.subject_teachers?.map((teacher) => (
                <li key={teacher.id}>
                  <p
                    className={styles.teacher}
                  >{`${teacher.name} ${teacher.surname}`}</p>
                </li>
              ))}
            </ul>
          )}
          <Link to="/" className={styles.meetingLink}>
            Video meeting
            <CheckedIcon />
          </Link>
        </div>
        {subjectData.next_lesson_date?.length !== 0 && (
          <div className={styles.eventsWrapper}>
            <h3 className={styles.eventTitle}>upcoming events</h3>
            <ul className={styles.eventList}>
              {subjectData.next_lesson_date?.map(
                ({ lesson_date, lesson_type }, index) => {
                  const date = new Date(lesson_date);
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  const dayOfWeek = date.toLocaleString("en-US", {
                    weekday: "long",
                  });

                  return (
                    <li key={index}>
                      <div className={styles.dateWrapper}>
                        <p className={styles.dayInfo}>{day} /</p>
                        <div className={styles.dateSubWrapper}>
                          <p className={styles.monthInfo}>{month}</p>
                          <p className={styles.dayOfWeekInfo}>{dayOfWeek}</p>
                        </div>
                      </div>
                      <p className={styles.lessonType}>{lesson_type}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
