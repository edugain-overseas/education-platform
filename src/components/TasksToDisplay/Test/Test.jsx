import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import { ReactComponent as CompleteIcon } from "../../../images/icons/complete.svg";
import { Empty } from "antd";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
// import { shuffleArray } from "../../../helpers/shuffleArray";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import { getUserType } from "../../../redux/user/userSelectors";
import { getUserInfo } from "../../../redux/user/userSelectors";
import { instance } from "../../../services/instance";
import styles from "./Test.module.scss";
import TestContructor from "./TestContructor/TestContructor";
// import { useParams } from "react-router-dom";
import { getTasks } from "../../../redux/task/taskSelectors";

export default function Test({ lessonData }) {
  const [testTitle, setTestTitle] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const isEdit = useSelector(getIsEdit);
  const userType = useSelector(getUserType);
  const studentId = useSelector(getUserInfo)?.student_id;

  const testContent = lessonData?.data?.testQuestions || null;
  const testqwe = useSelector(getTasks);
  console.log(testqwe);

  const { testId } = lessonData?.data;

  const handleSubmitTest = async () => {
    const studentTestData = {
      studentId,
      testId,
      studentAnswers,
    };
    console.log(studentTestData);
    try {
      const { data } = await instance.post(
        "/student-test/create",
        studentTestData
      );
      setResult(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setTestTitle(lessonData?.data?.lessonTitle);
      setTestDesc(lessonData?.data?.lessonDescription);
    }
  }, [isEdit, lessonData]);

  const setSingleAnswerState = (id, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.questionId === id) {
          question.answerId = value;
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMultipleAnswersState = (id, value) => {
    setStudentAnswers((prev) => {
      console.log(prev);
      const updatedState = prev.map((question) => {
        if (question.questionId === id) {
          if (question.answersIds.includes(value)) {
            return {
              ...question,
              answersIds: question.answersIds.filter((v) => v !== value),
            };
          }
          return {
            ...question,
            answersIds: [...question.answersIds, value],
          };
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMatchingState = (id, leftOptionId, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.questionId === id) {
          if (
            question.matching.find(
              ({ leftOptionId: leftId }) => leftId === leftOptionId
            )
          ) {
            question.matching.map((i) => {
              if (i.leftOptionId === leftOptionId) {
                i.rightOptionId = value;
              }
              return i;
            });
          } else {
            question.matching.push({
              leftOptionId: leftOptionId,
              rightOptionId: value,
            });
          }
        }
        return question;
      });
      return updatedState;
    });
  };

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
          imagePath,
        } = question;

        switch (type) {
          case "test":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const testState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionTest
                  // answers={shuffleArray([...answers])}
                  answers={answers}
                  setState={setSingleAnswerState}
                  state={testState}
                  id={id}
                />
              </div>
            );
          case "multiple_choice":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answersIds: [] },
              ]);
            }
            const multipleChoiseState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answersIds;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionMultipleChoice
                  // answers={shuffleArray([...answers])}
                  answers={answers}
                  state={multipleChoiseState}
                  setState={setMultipleAnswersState}
                  id={id}
                />
              </div>
            );
          case "answer_with_photo":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const photoAnswersState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionPhotoAnswers
                  // answers={shuffleArray([...answers])}
                  answers={answers}
                  state={photoAnswersState}
                  setState={setSingleAnswerState}
                  id={id}
                />
              </div>
            );
          case "question_with_photo":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const photoState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionPhoto
                  // answers={shuffleArray([...answers])}
                  answers={answers}
                  state={photoState}
                  setState={setSingleAnswerState}
                  id={id}
                  imagePath={imagePath}
                />
              </div>
            );
          case "matching":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, matching: [] },
              ]);
            }
            const matchingState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.matching;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    // left: shuffleArray([...answers.left]),
                    // right: shuffleArray([...answers.right]),
                    left: answers.left,
                    right: answers.right,
                  }}
                  state={matchingState}
                  setState={setMatchingState}
                  id={id}
                />
              </div>
            );
          case "boolean":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const booleanState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionTest
                  answers={answers}
                  // answers={shuffleArray([...answers])}
                  state={booleanState}
                  setState={setSingleAnswerState}
                  id={id}
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
            lessonData?.data?.lessonDescription && (
              <h2>
                <span>Description: </span>
                {lessonData?.data?.lessonDescription}
              </h2>
            )
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
          isEdit ? (
            <TestContructor testData={lessonData?.data} />
          ) : (
            testContent && testContent?.legth !== 0 && renderTestContent()
          )
        ) : (
          <Empty />
        )}
        {userType === "student" &&
          (result ? (
            <h3>{result.message}</h3>
          ) : (
            <div className={styles.submitTestBtnWrapper}>
              <button className={styles.completeBtn} onClick={handleSubmitTest}>
                <span>Complete</span>
                <CompleteIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
