import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import { Empty } from "antd";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import { shuffleArray } from "../../../helpers/shuffleArray";
import styles from "./Test.module.scss";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";

export default function Test({ lessonData }) {
  const [testTitle, setTestTitle] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const isEdit = useSelector(getIsEdit);

  const testContent = lessonData?.data?.testQuestions || null;

  const { testId } = lessonData?.data;

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
        console.log(question);
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
            console.log("test");
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/0`}</span>
                </div>
                <QuestionTest answers={shuffleArray([...answers])} />
              </div>
            );
          case "matching":
            console.log(answers);
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/80`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    left: shuffleArray([...answers.left]),
                    right: shuffleArray([...answers.right]),
                  }}
                />
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
      </div>
    </div>
  );
}
