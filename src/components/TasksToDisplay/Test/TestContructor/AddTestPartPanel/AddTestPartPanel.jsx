import React from "react";
import { ReactComponent as ClassicTestIcon } from "../../../../../images/icons/testQuestionIcons/classic.svg";
import { ReactComponent as MultipleChoiceTestIcon } from "../../../../../images/icons/testQuestionIcons/multipleChoice.svg";
import { ReactComponent as BooleanTestIcon } from "../../../../../images/icons/testQuestionIcons/boolean.svg";
import { ReactComponent as PhotoAnswersTestIcon } from "../../../../../images/icons/testQuestionIcons/photoAnswers.svg";
import { ReactComponent as PhotoQuestionTestIcon } from "../../../../../images/icons/testQuestionIcons/photoQuestion.svg";
import { ReactComponent as MatchingTestIcon } from "../../../../../images/icons/testQuestionIcons/matching.svg";
import styles from "./AddTestPartPanel.module.scss";
import { testPartsTemplate } from "../../../../../constants/testPartsTemplate";

const AddTestPartPanel = ({ questionsCount, setParts }) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().classic,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <ClassicTestIcon />
        <span>Classic</span>
      </button>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().multipleChoice,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <MultipleChoiceTestIcon />
        <span>Multiple choice</span>
      </button>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().boolean,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <BooleanTestIcon />
        <span>True/false</span>
      </button>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().photoAnswers,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <PhotoAnswersTestIcon />
        <span>Photo answers</span>
      </button>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().photoQuestion,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <PhotoQuestionTestIcon />
        <span>Photo question</span>
      </button>
      <button
        onClick={() =>
          setParts((prev) => [
            ...prev,
            {
              ...testPartsTemplate().matching,
              questionNumber: questionsCount + 1,
            },
          ])
        }
      >
        <MatchingTestIcon />
        <span>Match</span>
      </button>
    </div>
  );
};

export default AddTestPartPanel;
