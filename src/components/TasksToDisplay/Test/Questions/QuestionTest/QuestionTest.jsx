import React from "react";
import styles from "./QuestionTest.module.scss";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";

const QuestionTest = ({ answers, state, setState, id }) => {
  const onRadioInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ answerId, answerText }, index) => {
      return (
        <label
          key={answerId}
          className={
            state === answerId
              ? `${styles.option} ${styles.optionChecked}`
              : styles.option
          }
        >
          <input
            type="radio"
            name={`answerText`}
            value={answerId}
            checked={state === answerId}
            onChange={onRadioInputChange}
          />
          {getLetterVatiantsByIndex(index)} {answerText}
        </label>
      );
    });
  };
  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionTest;
