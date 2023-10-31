import React, { useState } from "react";
import { Image } from "antd";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import noImage from "../../../../../images/noImage.jpeg";
import styles from "./QuestionPhoto.module.scss";

const QuestionPhoto = ({ answers }) => {
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
  return (
    <div className={styles.questionBody}>
      <div className={styles.imageWrapper}>
        <Image src={answers.imagePath} fallback={noImage} />
      </div>
      <form className={styles.answersWrapper}>{renderAnswers()}</form>
    </div>
  );
};

export default QuestionPhoto;
