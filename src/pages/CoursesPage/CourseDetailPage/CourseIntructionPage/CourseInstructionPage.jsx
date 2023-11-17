import React, { useEffect, useState } from "react";
import styles from "./CourseInstructionPage.module.scss";
import InstructionsCategoriesList from "./InstructionsCategoriesList/InstructionsCategoriesList";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getIsEdit,
  getIsSubmit,
} from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import { setDefault } from "../../../../redux/config/configSlice";
import { getSubjectInstructions } from "../../../../redux/subject/subjectSelectors";

const CourseInstructionPage = () => {
  const { id } = useParams();
  const [courseToDisplay, setCourseToDisplay] = useState(1);

  const subjectInstructions = useSelector(getSubjectInstructions)?.find(
    (instructionsData) => instructionsData.id === id
  )?.data;

  const isEdit = useSelector(getIsEdit);
  const isSubmit = useSelector(getIsSubmit);

  const { instructionId } = useParams();


  const dispatch = useDispatch();

  const handleChooseCourse = (e) => {
    setCourseToDisplay(+e.target.id);
  };

  useEffect(() => {
    if (isSubmit) {
      dispatch(setDefault());
    }
    // eslint-disable-next-line
  }, [isEdit, isSubmit]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.controlPanel}>
        <button
          className={
            courseToDisplay === 1
              ? `${styles.courseBtn} ${styles.activeBtn}`
              : styles.courseBtn
          }
          id="1"
          onClick={handleChooseCourse}
        >
          Course 1
        </button>
        <button
          className={
            courseToDisplay === 2
              ? `${styles.courseBtn} ${styles.activeBtn}`
              : styles.courseBtn
          }
          id="2"
          onClick={handleChooseCourse}
        >
          Course 2
        </button>
        <button
          className={
            courseToDisplay === 3
              ? `${styles.courseBtn} ${styles.activeBtn}`
              : styles.courseBtn
          }
          id="3"
          onClick={handleChooseCourse}
        >
          Course 3
        </button>
        <button
          className={
            courseToDisplay === 4
              ? `${styles.courseBtn} ${styles.activeBtn}`
              : styles.courseBtn
          }
          id="4"
          onClick={handleChooseCourse}
        >
          Course 4
        </button>
      </div>
      <div className={styles.contentWrapper}>
        {subjectInstructions && (
          <div className={styles.instructionListWrapper}>
            <InstructionsCategoriesList data={subjectInstructions} />
          </div>
        )}
        {instructionId && (
          <div className={styles.instructionContetntWrapper}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInstructionPage;
