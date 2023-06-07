import React, { useState } from "react";
import { ReactComponent as SensIcon } from "../../../images/icons/send.svg";
import styles from './MessageForm.module.scss'

export function MessageForm() {
  const [message, setMessage] = useState("");
//   const [textareaHeight, setTextareaHeight] = useState(50);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.massageForm}>
      <textarea
        value={message}
        // onFocus={() => setTextareaHeight(150)}
        // onBlur={() => setTextareaHeight(50)}
        onChange={handleChange}
        placeholder="Enter you message here"
        rows={1}
        className={styles.messageInput}
        // style={{ resize: "none", height: textareaHeight, width: "100%" }}
      />
      <div>
      <button type="submit" className={styles.sendButton}>
        <SensIcon />
      </button>
      </div>
    </form>
  );
}
