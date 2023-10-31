import React, { useEffect } from "react";
import ModulesList from "../../../../components/ModulesList/ModulesList";
import { ReactComponent as SortIcon } from "../../../../images/icons/sort.svg";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../../redux/subject/subjectSelectors";
import { Outlet, useParams } from "react-router-dom";
import styles from "./CourseTasksPage.module.scss";
import { getIsSubmit } from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import { setDefault } from "../../../../redux/config/configSlice";

const CourseTasksPage = () => {
  const { id, lessonId } = useParams();
  const isSubmit = useSelector(getIsSubmit);
  const dispatch = useDispatch();
  const subject = useSelector(getSubjectData).find(
    (subject) => `${subject.id}` === id
  );
  const modules = subject?.subjects_lessons
    ? [...subject?.subjects_lessons].sort(
        (itemA, itemB) => itemA.module_number - itemB.module_number
      )
    : null;
  useEffect(() => {
    if (isSubmit) {
      dispatch(setDefault());
    }
  }, [isSubmit, dispatch]);
  return (
    <div className={styles.tasksPageMainWrapper}>
      <div className={styles.titlesWrapper}>
        {!lessonId && (
          <div className={styles.primaryTitleWrapper}>
            <h1>tasks</h1>
            <select name="" id="" defaultValue="All tasks">
              <optgroup>
                <option value="All tasks">All tasks</option>
                <option value="test">Test</option>
              </optgroup>
            </select>
          </div>
        )}
        {!lessonId && (
          <div className={styles.secondaryTitleWrapper}>
            <h2>
              <span>Course: </span>
              Medicina (1 cours - 1 simestr)
            </h2>
            <div className={styles.buttonsWrapper}>
              <button className={styles.sortBtn}>
                <SortIcon />
              </button>
              <button className={styles.searchBtn}>
                <SearchIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      {lessonId ? <Outlet /> : <ModulesList modules={modules} />}
    </div>
  );
};

export default CourseTasksPage;
