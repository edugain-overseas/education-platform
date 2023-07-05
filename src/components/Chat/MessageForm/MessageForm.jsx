import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/userSelectors";

export function MessageForm({ socket }) {
  const [messageHTML, setMessageHTML] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const userId = useSelector(getUserId);

  const HtmlRegExp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageHTML.replaceAll(HtmlRegExp, "").trim() === "") {
      console.log("Empty message");
      return;
    }

    const data = {
      message: messageHTML,
      sender_id: userId,
      sender_type: "student",
      fixed: false,
      type: "message",
    };

    console.log(sendTo);

    try {
      socket.send(JSON.stringify(data));
      console.log("sended");
    } catch (error) {
      console.log(error.message);
    }

    setMessageHTML("");
  };

  const handleFocusForm = (e) => {
    if (e.target.className.includes("ant")) {
      return;
    }
    setIsFocused(true);
  };

  const handleBlurFrom = (e) => {
    if (e.target.className.includes("ant")) {
      return;
    }

    if (e.relatedTarget && e.relatedTarget.className.includes("ant")) {
      return;
    }

    setIsFocused(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.massageForm}
      onFocus={handleFocusForm}
      onBlur={handleBlurFrom}
    >
      <Quill
        onChange={setMessageHTML}
        value={messageHTML}
        focused={isFocused}
      />
      <div className={styles.toolbarRight}>
        <MultipleSelect
          onChange={(values) => {
            setSendTo(values);
          }}
        />
        
        <button type="submit" className={styles.sendButton}>
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
