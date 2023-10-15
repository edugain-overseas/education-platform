import React from "react";
import SuperInput from "../../../../../shared/SuperInput/SuperInput";
import styles from "./TextPart.module.scss";

const TextPart = ({ state, setState }) => {
  const onTitleChange = (value) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            attr_title: value,
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  const onTextChange = (value) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            value: value,
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  return (
    <div className={styles.textPartWrapper}>
      <SuperInput
        state={state.attr_title}
        setState={onTitleChange}
        placeholder="Please write your titule here..."
        styles={styles}
      />
      <SuperInput
        state={state.value}
        setState={onTextChange}
        placeholder="Please write your text here..."
        styles={styles}
      />
    </div>
  );
};

export default TextPart;
