import React, { useRef } from "react";

const AutoRowsTextarea = ({ state, setState, styles = {} }) => {
  const textareaRef = useRef();
  const autoGrow = () => {
    textareaRef.current.style.height = `${textareaRef.current.scollHeight}px`;
  };

  return (
    <textarea ref={textareaRef} className={styles.textarea} rows="1"></textarea>
  );
};

export default AutoRowsTextarea;
