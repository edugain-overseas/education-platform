import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../../../redux/subject/subjectSelectors";
import Lecture from "../../../../../components/TasksToDisplay/Lecture/Lecture";
import Test from "../../../../../components/TasksToDisplay/Test/Test";
import { ReactComponent as PrevIcon } from "../../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../../images/icons/next.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../../../images/icons/arrow-left.svg";
import { ReactComponent as QuestionIcon } from "../../../../../images/icons/question.svg";
import styles from "./TaskDetailPage.module.scss";
import { useDispatch } from "react-redux";
import { getLectureByTaskIdThunk } from "../../../../../redux/task/taskOperation";
import { getTasks } from "../../../../../redux/task/taskSelectors";

export default function TaskDetailPage() {
  const [type, setType] = useState(null);
  const dispatch = useDispatch();
  const { id, lessonId } = useParams();
  const subjectData = useSelector(getSubjectData);
  const lessonData = useSelector(getTasks).find(
    (lesson) => lesson.id === lessonId
  );

  //   const lessonType = console.log(lessonType);

  useEffect(() => {
    setType(
      subjectData
        ?.find((subject) => subject.id === id)
        ?.subjects_lessons.find((module) =>
          module.module_lessons.some(
            (lesson) => `${lesson.lesson_id}` === lessonId
          )
        )
        ?.module_lessons.find((lesson) => `${lesson.lesson_id}` === lessonId)
        ?.lesson_type
    );
  }, [subjectData, id, lessonId]);

  console.log(type, lessonId);

  useEffect(() => {
    if (type && lessonId) {
      switch (type) {
        case "lecture":
          dispatch(getLectureByTaskIdThunk(lessonId));
          break;
        default:
          break;
      }
    }
  }, [lessonId, type, dispatch]);

  const getComponentByType = () => {
    switch (type) {
      case "lecture":
        return <Lecture lessonData={lessonData} />;
      case "test":
        return <Test lessonData={lessonData} />;
      default:
        break;
    }
  };

  return (
    <div className={styles.taskDetailWrapper}>
      <div className={styles.controlPanel}>
        <div className={styles.navWrapper}>
          <button className={styles.prevBtn}>
            <PrevIcon />
          </button>
          <button className={styles.nextBtn}>
            <NextIcon />
          </button>
        </div>
        <div className={styles.additionNavWrapper}>
          <button className={styles.backBtn}>
            <span>Back to task selection</span>
            <ArrowLeftIcon />
          </button>
          <button className={styles.questionBtn}>
            <span>Ask the teacher a question</span>
            <QuestionIcon />
          </button>
        </div>
      </div>
      {lessonData && getComponentByType()}
    </div>
  );
}
