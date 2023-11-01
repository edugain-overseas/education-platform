import React from "react";
import { Image } from "antd";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import noImage from "../../../../../images/noImage.jpeg";
import { serverName } from "../../../../../constants/server";
import styles from "./QuestionPhoto.module.scss";

const QuestionPhoto = ({ answers, state, setState, id, imagePath }) => {
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
  return (
    <div className={styles.questionBody}>
      <div className={styles.imageWrapper}>
        <Image src={`${serverName}${imagePath}`} fallback={noImage} />
      </div>
      <form className={styles.answersWrapper}>{renderAnswers()}</form>
    </div>
  );
};

export default QuestionPhoto;
