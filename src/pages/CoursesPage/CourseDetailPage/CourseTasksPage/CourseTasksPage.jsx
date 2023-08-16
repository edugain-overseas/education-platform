import React from "react";
import ModulesList from "../../../../components/ModulesList/ModulesList";
import { ReactComponent as SortIcon } from "../../../../images/icons/sort.svg";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../../redux/subject/subjectSelectors";
import styles from "./CourseTasksPage.module.scss";
import { useParams } from "react-router-dom";

const CourseTasksPage = () => {
  const { id } = useParams();

  const modules = useSelector(getSubjectData).find(
    (subject) => `${subject.id}` === id
  ).subjects_lessons;
  console.log(modules);
  return (
    <div className={styles.tasksPageMainWrapper}>
      <div className={styles.titlesWrapper}>
        <div className={styles.primaryTitleWrapper}>
          <h1>tasks</h1>
          <select name="" id="" defaultValue="All tasks">
            <optgroup>
              <option value="All tasks">All tasks</option>
              <option value="test">Test</option>
            </optgroup>
          </select>
        </div>
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
      </div>
      <ModulesList modules={modules} />
    </div>
  );
};

export default CourseTasksPage;
