import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";

export function MessageForm() {
  const [messageHTML, setMessageHTML] = useState('');
  const [sendTo, setSendTo] = useState([])


  const handleSubmit = (event) => {
    event.preventDefault();
    const message = {
      messageHTML,
      sendTo
    }
    console.log(message);
    setMessageHTML("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.massageForm}
    >
      <Quill onChange={setMessageHTML} value={messageHTML}/>
      <div className={styles.toolbarRight}>
        <MultipleSelect onChange={(values)=>{
          console.log(values);
          setSendTo(values)
        }}/>
        <button type="submit" className={styles.sendButton}>
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
