import React, { useState } from "react";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import { Image } from "antd";
import { serverName } from "../../../../../constants/server";
import noImage from "../../../../../images/noImage.jpeg";
import styles from "./QuestionPhotoAnswers.module.scss";

const QuestionPhotoAnswers = ({ answers }) => {
  const [value, setValue] = useState("");

  const onRadioInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ answerId, answerText, imagePath }, index) => {
      return (
        <div key={answerId} className={styles.imageCard}>
          <Image
            src={`${serverName}${imagePath}`}
            // fallback="../../../../../images/noImage.jpeg"
            fallback={noImage}
          />
          <label
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
        </div>
      );
    });
  };
  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionPhotoAnswers;
