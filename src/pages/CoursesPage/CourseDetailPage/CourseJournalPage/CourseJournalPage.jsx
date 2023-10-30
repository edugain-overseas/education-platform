import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Empty } from "antd";
import {
  getSubjectData,
  getSubjectMainInfo,
} from "../../../../redux/subject/subjectSelectors";
import {
  sortLessonsByDate,
  sortLessonsByScore,
  sortLessonsByType,
} from "../../../../helpers/sortLessons";
import ProgressPanel from "../../../../components/ProgressPanel/ProgressPanel";
import StudentsJounal from "./StudentsJounal/StudentsJounal";
import styles from "./CourseJournalPage.module.scss";

const generateRandomScore = () =>
  Math.floor(Math.random() * (200 - 100 + 1)) + 100;

const CourseJournalPage = () => {
  const [lessonsData, setLessonsData] = useState([]);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByType, setIsSortedByType] = useState(false);
  const [isSortedByScore, setIsSortedByScore] = useState(false);
  const { id: subjectId } = useParams();

  const subjectData = useSelector(getSubjectData)?.find(
    ({ id }) => id === +subjectId
  );
  const modules = subjectData?.subjects_lessons || [];
  const subjectTitle = useSelector(getSubjectMainInfo)?.find(
    ({ id }) => id === +subjectId
  )?.title;

  useEffect(() => {
    if (lessonsData.length !== 0) {
      return;
    }

    const lessons = modules.reduce((lessons, module) => {
      for (let lesson of module.module_lessons) {
        lessons.push({ ...lesson, score: generateRandomScore() });
      }
      return lessons;
    }, []);

    const sortedLessonsByDate = sortLessonsByDate(lessons);
    setLessonsData(sortedLessonsByDate);
    // eslint-disable-next-line
  }, [modules.length]);

  const sortByDate = () => {
    if (isSortedByDate) {
      setLessonsData(sortLessonsByDate(lessonsData, 1));
      setIsSortedByDate(false);
      return;
    } else {
      setLessonsData(sortLessonsByDate(lessonsData, 0));
      setIsSortedByDate(true);
    }
  };
  const sortByType = () => {
    if (isSortedByType) {
      setLessonsData(sortLessonsByType(lessonsData, 1));
      setIsSortedByType(false);
    } else {
      setLessonsData(sortLessonsByType(lessonsData, 0));
      setIsSortedByType(true);
    }
  };
  const sortByScore = () => {
    if (isSortedByScore) {
      setLessonsData(sortLessonsByScore(lessonsData, 1));
      setIsSortedByScore(false);
    } else {
      setLessonsData(sortLessonsByScore(lessonsData, 0));
      setIsSortedByScore(true);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.journal}>
        {subjectTitle && (
          <h1 className={styles.journalTitile}>
            <span>Journal</span>
            {`(${subjectTitle})`}
          </h1>
        )}
        <div className={styles.journalBodyWrapper}>
          <div className={styles.journalBody}>
            {lessonsData.length !== 0 ? (
              <StudentsJounal
                lessonsData={lessonsData}
                isSortedByDate={isSortedByDate}
                sortByDate={sortByDate}
                isSortedByType={isSortedByType}
                sortByType={sortByType}
                isSortedByScore={isSortedByScore}
                sortByScore={sortByScore}
              />
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
      <div className={styles.progressBar}>
        {subjectData && <ProgressPanel subjectData={subjectData} />}
      </div>
    </div>
  );
};

export default CourseJournalPage;
