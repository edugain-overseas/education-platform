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

const data = [
  {
    instructionCategory: "Экзамен",
    instructionCategoryId: 1,
    course_number: 1,
    instructions: [
      {
        instructionId: 1,
        number: 1,
        title: "Instruction header",
        subTitle: "subtitle1",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry",
        date: "2023-09-20",
        files: [],
      },
      {
        instructionId: 2,
        number: 2,
        title: "Instruction header2",
        subTitle: "subtitle2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry",
        date: "2023-09-22",
        files: ["static/subject-files/instruction/response.png"],
      },
      {
        instructionId: 3,
        number: 2,
        title: "Instruction header2",
        subTitle: "subtitle3",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry",
        date: "2023-09-22",
        files: [
          "static/subject-files/instruction/0-02-05-2ac79043cfd6dffbde08c0f5e8146b27015025ae9f6bba5882cf8176452d43c8_1c6db5620a9658.jpg",
          "static/subject-files/instruction/region.csv",
        ],
      },
      {
        instructionId: 4,
        number: 2,
        title: "Instruction header2",
        subTitle: "subtitle4",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry",
        date: "2023-09-22",
        files: [
          "static/subject-files/instruction/0-02-05-2ac79043cfd6dffbde08c0f5e8146b27015025ae9f6bba5882cf8176452d43c8_1c6db5620a9658.jpg",
          "static/subject-files/instruction/region.csv",
        ],
      },
    ],
  },
  {
    instructionCategory: "Документы для практики",
    instructionCategoryId: 2,
    course_number: 1,
    instructions: [
      {
        instructionId: 5,
        number: 3,
        title: "Header",
        subTitle: "for practice1",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry ",
        date: "2023-09-26",
        files: [
          "static/subject-files/instruction/0-02-04-75f1fd36aff9c3e5aba430c4972ae22da2982ac69866354d846d95e341b58ef4_1c6db34d091a5a.jpg",
          "static/subject-files/instruction/0-02-05-8b7fffdf8804d8d128fc634bd485288ebdf62bee58af3d0435a01f039b8125da_1c6db4f4b4b0e7.jpg",
        ],
      },
      {
        instructionId: 6,
        number: 3,
        title: "Header",
        subTitle: "for practice2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry ",
        date: "2023-09-26",
        files: [
          "static/subject-files/instruction/0-02-04-75f1fd36aff9c3e5aba430c4972ae22da2982ac69866354d846d95e341b58ef4_1c6db34d091a5a.jpg",
          "static/subject-files/instruction/0-02-05-8b7fffdf8804d8d128fc634bd485288ebdf62bee58af3d0435a01f039b8125da_1c6db4f4b4b0e7.jpg",
          "static/subject-files/instruction/0-02-05-ddee47bc4f0040eaf719641a9fa335901aa41c30b7df1ee3c0dbb8c66790a65a_1c6db2096b75ae.jpg",
        ],
      },
    ],
  },
];

const CourseInstructionPage = () => {
  const [courseToDisplay, setCourseToDisplay] = useState(1);

  const isEdit = useSelector(getIsEdit);
  const isSubmit = useSelector(getIsSubmit);

  const { instructionId } = useParams();
  console.log(instructionId);

  const dataToDisplay = data.filter(
    (item) => item.course_number === courseToDisplay
  );

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
        <div className={styles.instructionListWrapper}>
          <InstructionsCategoriesList data={dataToDisplay} />
        </div>
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
