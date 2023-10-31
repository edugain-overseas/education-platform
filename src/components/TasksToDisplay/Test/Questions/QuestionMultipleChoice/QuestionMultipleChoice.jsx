import React, { useState } from "react";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import styles from "./QuestionMultipleChoice.module.scss";

const QuestionMultipleChoice = ({ answers }) => {
  const [values, setValues] = useState([]);

  const onCheckboxInputChange = (e) => {
    const value = +e.target.value;
    setValues((prev) =>
      prev.includes(value)
        ? prev.filter((selectedValue) => selectedValue !== value)
        : [...prev, value]
    );
  };

  const renderAnswers = () => {
    if (!answers) {
      return null;
    }

    return answers.map(({ answerId, answerText }, index) => (
      <label
        key={answerId}
        className={
          values.includes(answerId)
            ? `${styles.option} ${styles.optionChecked}`
            : styles.option
        }
      >
        <input
          type="checkbox"
          name={`answerText`}
          value={answerId}
          checked={values.includes(answerId)}
          onChange={onCheckboxInputChange}
        />
        {getLetterVatiantsByIndex(index)} {answerText}
      </label>
    ));
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
