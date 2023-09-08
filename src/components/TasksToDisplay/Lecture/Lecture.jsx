import React from "react";
import styles from "./Lecture.module.scss";

export default function Lecture({ lessonData }) {
  // const metaDataToRender = lessonData.data[0];
  console.log(lessonData);
  return (
    <div className={styles.lectureContainer}>
      <div className={styles.titleWrapper}>
        <h2>
          <span>Theme:</span>
        </h2>
        <h2>
          <span>Lecture №</span>1
        </h2>
      </div>
    </div>
  );
}
