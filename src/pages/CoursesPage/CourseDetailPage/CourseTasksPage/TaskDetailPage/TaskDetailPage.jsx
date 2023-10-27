import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../../../redux/subject/subjectSelectors";
import Lecture from "../../../../../components/TasksToDisplay/Lecture/Lecture";
import Test from "../../../../../components/TasksToDisplay/Test/Test";
import { ReactComponent as PrevIcon } from "../../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../../images/icons/next.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../../../images/icons/arrow-left.svg";
import { ReactComponent as QuestionIcon } from "../../../../../images/icons/question.svg";
import { useDispatch } from "react-redux";
import {
  getTestByTaskIdThunk,
  getLectureByTaskIdThunk,
} from "../../../../../redux/task/taskOperation";
import { getTasks } from "../../../../../redux/task/taskSelectors";
import { Empty } from "antd";
import styles from "./TaskDetailPage.module.scss";

export default function TaskDetailPage() {
  const [type, setType] = useState(null);
  const dispatch = useDispatch();
  const { id, lessonId } = useParams();
  const subjectData = useSelector(getSubjectData);
  const lessonData = useSelector(getTasks).find(
    (lesson) => lesson.id === lessonId
  );
  const navigate = useNavigate();

  useEffect(() => {
    setType(
      subjectData
        ?.find((subject) => subject.id === +id)
        ?.subjects_lessons.find((module) =>
          module.module_lessons.some((lesson) => lesson.lesson_id === +lessonId)
        )
        ?.module_lessons.find((lesson) => lesson.lesson_id === +lessonId)
        ?.lesson_type
    );
  }, [subjectData, id, lessonId]);

  useEffect(() => {
    if (type && lessonId) {
      switch (type) {
        case "lecture":
          dispatch(getLectureByTaskIdThunk(lessonId)).then(()=>{
            
          });
          break;
        case "test":
          dispatch(getTestByTaskIdThunk(lessonId));
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

  const hanleNextLessonClick = () => {
    navigate(`/courses/${id}/tasks/${+lessonId + 1}`);
  };

  const handleBackToSelection = () => {
    navigate(`/courses/${id}/tasks`);
  };

  const hanlePrevLessonClick = () => {
    if (+lessonId === 1) {
      return;
    }
    navigate(`/courses/${id}/tasks/${+lessonId - 1}`);
  };
  return (
    <div className={styles.taskDetailWrapper}>
      <div className={styles.controlPanel}>
        <div className={styles.navWrapper}>
          <button className={styles.prevBtn} onClick={hanlePrevLessonClick}>
            <PrevIcon />
          </button>
          <button className={styles.nextBtn} onClick={hanleNextLessonClick}>
            <NextIcon />
          </button>
          <h1>Tasks</h1>
        </div>
        <div className={styles.additionNavWrapper}>
          <button className={styles.backBtn} onClick={handleBackToSelection}>
            <span>Back to task selection</span>
            <ArrowLeftIcon />
          </button>
          <button className={styles.questionBtn}>
            <span>Ask the teacher a question</span>
            <QuestionIcon />
          </button>
        </div>
      </div>
      {lessonData ? getComponentByType() : <Empty />}
    </div>
  );
}
