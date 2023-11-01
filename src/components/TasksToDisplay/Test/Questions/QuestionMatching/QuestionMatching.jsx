import React from "react";
import styles from "./QuestionMatching.module.scss";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import { Select } from "antd";

const QuestionMatching = ({ answers, setState, id }) => {
  const leftOptions = answers?.left || [];
  const rightOptions = answers?.right || [];

  const options = rightOptions.map(({ id }, index) => ({
    label: <span>{getLetterVatiantsByIndex(index)}</span>,
    value: id,
  }));

  return (
    <div className={styles.matchWrapper}>
      <div className={styles.oprionsWrapper}>
        <ul className={styles.left}>
          {leftOptions.map(({ id, value }, index) => (
            <li key={id}>
              <p>
                {`${index + 1})`} {value}
              </p>
            </li>
          ))}
        </ul>
        <ul className={styles.right}>
          {rightOptions.map(({ id, value }, index) => (
            <li key={id}>
              <p>
                {getLetterVatiantsByIndex(index)} {value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.selectOptionsWrapper}>
        <span className={styles.matchPointer}>Answer options:</span>
        <ul>
          {leftOptions.map(({ id: leftOptionId }, index) => (
            <li key={leftOptionId}>
              <span>{`${index + 1}) = `}</span>
              <Select
                options={options}
                bordered={false}
                onChange={(value) => setState(id, leftOptionId, +value)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionMatching;
