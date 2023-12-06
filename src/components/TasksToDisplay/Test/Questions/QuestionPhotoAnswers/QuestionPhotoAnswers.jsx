import React from "react";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import { Image } from "antd";
import { serverName } from "../../../../../constants/server";
import noImage from "../../../../../images/noImage.jpeg";
import styles from "./QuestionPhotoAnswers.module.scss";


const QuestionPhotoAnswers = ({ answers, state, setState, id }) => {
  const onRadioInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ answerId, answerText, imagePath }, index) => {
      console.log(imagePath);
      return (
        <div key={answerId} className={styles.imageCard}>
          <Image src={`${serverName}${imagePath}`} fallback={noImage} />
          <label
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
        </div>
      );
    });
  };
  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionPhotoAnswers;
