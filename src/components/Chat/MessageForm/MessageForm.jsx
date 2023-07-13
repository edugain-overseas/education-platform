import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/userSelectors";
import { AttachFiles } from "./AttachFiles/AttachFiles";

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
      type: "message", //[message || asnwer]
      message: messageHTML,
      message_type: "everyone", //[everyone, several, alone]
      recipient: null, // [null, [id..], id]
      fixed: false,
      sender_id: userId,
      sender_type: "student", // [curator, moder, student]
      attach_file_path: null // [null, [URLs], URL]
    };

    console.log(data);

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

    if (e.relatedTarget && e.relatedTarget.className.includes("AttachFiles")) {
      return
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
      <AttachFiles show={isFocused} />
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
