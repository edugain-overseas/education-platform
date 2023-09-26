import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "antd";
import { ReactComponent as PrevIcon } from "../../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../../images/icons/next.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import styles from "./IntructionContent.module.scss";

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

const IntructionContent = () => {
  const { id, instructionId } = useParams();
  const navigate = useNavigate();

  const instructionData = data
    .reduce((result, category) => [...result, ...category.instructions], [])
    .find((instruction) => instruction.instructionId === +instructionId) || null;
  console.log(instructionData);

  const { title, subTitle, text } = instructionData || {};

  const handlePrevInstructionClick = () => {
    navigate(`/courses/${id}/instructions/${+instructionId - 1}`);
  };

  const handleNextInstructionClick = () => {
    navigate(`/courses/${id}/instructions/${+instructionId + 1}`);
  };

  return (
    <>
      {instructionData ? (
        <>
          <div className={styles.instructionHeader}>
            <div className={styles.navBtnsWrapper}>
              <button
                disabled={instructionId === "1"}
                onClick={handlePrevInstructionClick}
              >
                <PrevIcon />
              </button>
              <button onClick={handleNextInstructionClick}>
                <NextIcon />
              </button>
            </div>
            <button>
              <DetailsIcon />
            </button>
          </div>
          <div className={styles.instructionBody}>
            <h3 className={styles.instructionTitle}>{title}</h3>
            <h4 className={styles.instructionSubTitle}>{subTitle}</h4>
            <p className={styles.instructionText}>{text}</p>
            <div className={styles.instructionFiles}></div>
          </div>
        </>
      ) : (
        <div className={styles.emptyWrapper}>
          <Empty />
        </div>
      )}
    </>
  );
};

export default IntructionContent;
