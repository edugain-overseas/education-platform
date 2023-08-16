import React from "react";
import styles from "./ProgressPanel.module.scss";
import { Progress } from "antd";

export default function ProgressPanel({ subjectData }) {
  const rootFontSize = parseFloat(document.documentElement.style.fontSize);

  const sizeInRem = 120;
  const sizeInPx = sizeInRem * rootFontSize;

  const strokeWidthInRem = 3;
  const strokeWidthInPx = strokeWidthInRem * rootFontSize;

  const average = 112;
  const progress = 25;

  const handleFormatProgress = (percent) => (
    <div className={styles.contentWrapper}>
      <h4 className={styles.subtitle}>Completed</h4>
      <p className={styles.progressValue}>
        {percent}
        <span>%</span>
      </p>
    </div>
  );

  const handleFormatRating = () => (
    <div className={styles.contentWrapper}>
      <h4 className={styles.subtitle}>Average</h4>
      <p className={styles.progressValue}>{average}(B)</p>
    </div>
  );

  const formatDate = () => {
    if (subjectData.subject_exam_date) {
      const date = subjectData.subject_exam_date.split("-").reverse().join('.');
      return date
    }
    return ''
  };

  return (
    <div className={styles.progressMainWrapper}>
      <div>
        <div className={styles.progressSubWrapper}>
          <h3 className={styles.progressTitle}>your progress</h3>
          <div className={styles.outerProgressWrapper}>
            <div className={styles.innerProgressWrapper}>
              <Progress
                type="circle"
                format={handleFormatProgress}
                percent={progress}
                size={sizeInPx}
                style={{ position: "absolute" }}
                strokeWidth={strokeWidthInPx}
                strokeColor="#4171CD"
                trailColor="#fff"
              />
            </div>
          </div>
        </div>
        <div className={styles.progressSubWrapper}>
          <h3 className={styles.progressTitle}>your rating</h3>
          <div className={styles.outerProgressWrapper}>
            <div className={styles.innerProgressWrapper}>
              <Progress
                type="circle"
                format={handleFormatRating}
                percent={0.5 * average}
                size={sizeInPx}
                style={{ position: "absolute" }}
                strokeWidth={strokeWidthInPx}
                strokeColor={["#B8EAFF", "#6FD4FF"]}
                trailColor="#fff"
              />
            </div>
          </div>
          <div className={styles.examInfoWrapper}>
            <p className={styles.examTitle}>examination session</p>
            <p className={styles.examDate}>Date: {formatDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
