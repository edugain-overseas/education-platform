import React from "react";

export default function DayDisplay({ day, styles }) {
  return (
    <div className={styles.dateWrapper}>
      <p className={styles.dayInfo}>{day.format("DD")} /</p>
      <div className={styles.dateSubWrapper}>
        <p className={styles.monthInfo}>{day.format("MM")}</p>
        <p className={styles.dayOfWeekInfo}>{day.format("dddd")}</p>
      </div>
    </div>
  );
}
