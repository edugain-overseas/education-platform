import React, { useState } from "react";
import { ReactComponent as SensIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";

export function MessageForm() {
  const [message, setMessage] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    setMessage("");
  };

  // const handleChange = (event) => {
  //   setMessage(event.target.value);
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className={isFormFocused ? `${styles.massageForm} ${styles.focusedForm}` : `${styles.massageForm}`}
      onFocus={()=>setIsFormFocused(true)}
      onBlur={()=>setIsFormFocused(false)}
    >
      <Quill />
      <div className={styles.toolbarRight}>
        <MultipleSelect />
        <button type="submit" className={styles.sendButton}>
          <SensIcon />
        </button>
      </div>
    </form>
  );
}
