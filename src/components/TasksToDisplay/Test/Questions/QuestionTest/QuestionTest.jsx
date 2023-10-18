import React, { useState } from "react";
import styles from "./QuestionTest.module.scss";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";

const QuestionTest = ({ answers }) => {
  const [value, setValue] = useState("");

  const onRadioInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
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
            +value === answerId
              ? `${styles.option} ${styles.optionChecked}`
              : styles.option
          }
        >
          <input
            type="radio"
            name={`answerText`}
            value={answerId}
            checked={+value === answerId}
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
