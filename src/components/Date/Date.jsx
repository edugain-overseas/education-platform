import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from './Date.module.scss'

export const Date = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const date = moment().format("dddd, D MMMM, YYYY");

  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>{date}</p>
      <p className={styles.currentTime}>{currentTime}</p>
    </div>
  );
};
