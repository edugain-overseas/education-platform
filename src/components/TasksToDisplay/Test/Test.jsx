import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import { ReactComponent as CompleteIcon } from "../../../images/icons/complete.svg";
import { Empty } from "antd";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import { shuffleArray } from "../../../helpers/shuffleArray";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import styles from "./Test.module.scss";

export default function Test({ lessonData }) {
  const [testTitle, setTestTitle] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const isEdit = useSelector(getIsEdit);

  const testContent = lessonData?.data?.testQuestions || null;

  const { testId } = lessonData?.data;

  const handleSubmitTest = () => {
    console.log("submit test");
  };

  useEffect(() => {
    if (isEdit) {
      setTestTitle(lessonData?.data?.lessonTitle);
      setTestDesc(lessonData?.data?.lessonDescription);
    }
  }, [isEdit, lessonData]);

  const renderTestContent = () =>
    [...testContent]
      .sort((itemA, itemB) => itemA.questionNumber - itemB.questionNumber)
      .map((question) => {
        const {
          questionId: id,
          questionNumber: number,
          questionScore: score,
          questionText: text,
          questionType: type,
          questionAnswers: answers,
        } = question;

        switch (type) {
          case "test":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionTest answers={shuffleArray([...answers])} />
              </div>
            );
          case "multiple_choice":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionMultipleChoice answers={shuffleArray([...answers])} />
              </div>
            );
          case "answer_with_photo":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionPhotoAnswers answers={shuffleArray([...answers])} />
              </div>
            );
          case "question_with_photo":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionPhoto answers={shuffleArray([...answers])} />
              </div>
            );
          case "matching":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    left: shuffleArray([...answers.left]),
                    right: shuffleArray([...answers.right]),
                  }}
                />
              </div>
            );
          case "boolean":
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/135`}</span>
                </div>
                <QuestionTest answers={shuffleArray([...answers])} />
              </div>
            );
          default:
            return null;
        }
      });

  return (
    <div className={styles.testContainer}>
      <div className={styles.testContent}>
        <div
          className={
            isEdit
              ? `${styles.titleWrapper} ${styles.titleWrapperBordered}`
              : styles.titleWrapper
          }
        >
          {isEdit && isTitleEdit ? (
            <input
              className={styles.titleInput}
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
            />
          ) : (
            <h2>
              <span>Theme: </span>
              {lessonData?.data?.lessonTitle}
            </h2>
          )}
          {isEdit && isTitleEdit ? (
            <input
              className={styles.titleInput}
              type="text"
              value={testDesc}
              onChange={(e) => setTestDesc(e.target.value)}
            />
          ) : (
            <h2>
              <span>Description: </span>
              {lessonData?.data?.lessonDescription}
            </h2>
          )}
          <h2>
            <span>Test №:</span>
            {testId}
          </h2>
          {isEdit && (
            <button
              type="button"
              onClick={() => setIsTitleEdit((prev) => !prev)}
            >
              <EditIcon />
            </button>
          )}
        </div>
        {(testContent && testContent?.legth !== 0) || isEdit ? (
          testContent && testContent?.legth !== 0 && renderTestContent()
        ) : (
          <Empty />
        )}
        <div className={styles.submitTestBtnWrapper}>
          <button className={styles.completeBtn} onClick={handleSubmitTest}>
            <span>Complete</span>
            <CompleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
