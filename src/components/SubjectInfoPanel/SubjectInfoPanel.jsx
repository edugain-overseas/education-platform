import React from "react";
import styles from "./SubjectInfoPanel.module.scss";
import image from "../../images/subject_image.png";
import { Link } from "react-router-dom";
import { ReactComponent as CheckedIcon } from "../../images/icons/checked.svg";

export default function SubjectInfoPanel() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="/" />
        <h3 className={styles.groupName}>Group 23-01D</h3>
      </div>
      <div className={styles.mainInfoWrapper}>
        <h2 className={styles.title}>Medicine</h2>
        <p className={styles.teacher}></p>
        <Link to="/">
          Video meeting
          <CheckedIcon />
        </Link>
      </div>
      <div className={styles.eventsWrapper}>
        <h3 className={styles.eventTitle}>upcoming events</h3>
        <ul className={styles.eventList}>
          <li>
            <div className={styles.dateWrapper}>
              <p className={styles.dayInfo}>25 /</p>
              <div className={styles.dateSubWrapper}>
                <p className={styles.monthInfo}>05</p>
                <p className={styles.dayOfWeekInfo}>Tuesday</p>
              </div>
            </div>
            <p className={styles.lessonType}>Video Webinar</p>
          </li>
          <li>
            <div className={styles.dateWrapper}>
              <p className={styles.dayInfo}>25 /</p>
              <div className={styles.dateSubWrapper}>
                <p className={styles.monthInfo}>05</p>
                <p className={styles.dayOfWeekInfo}>Tuesday</p>
              </div>
            </div>
            <p className={styles.lessonType}>Video Webinar</p>
          </li>
          <li>
            <div className={styles.dateWrapper}>
              <p className={styles.dayInfo}>25 /</p>
              <div className={styles.dateSubWrapper}>
                <p className={styles.monthInfo}>05</p>
                <p className={styles.dayOfWeekInfo}>Tuesday</p>
              </div>
            </div>
            <p className={styles.lessonType}>Video Webinar</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
