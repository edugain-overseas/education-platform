import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useSelector } from "react-redux";
import { getUserId, getUserType } from "../../../redux/user/userSelectors";
import { AttachFiles } from "./AttachFiles/AttachFiles";
import { HtmlRegExp } from "../../../constants/regExp";
import { getParticipantsData } from "../../../redux/chat/chatSelectors";
import { getMessageType } from "../../../helpers/getMessageType";
import { getMessageRecepients } from "../../../helpers/getMessageRecepients";

export function MessageForm({ socket }) {
  const [messageHTML, setMessageHTML] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const userId = useSelector(getUserId);
  const participantsData = useSelector(getParticipantsData);
  const userType = useSelector(getUserType)

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageHTML.replaceAll(HtmlRegExp, "").trim() === "") {
      console.log("Empty message");
      return;
    }

    const chatUsers = participantsData.map(user=>user.UserId)
    

    const data = {
      type: "message",
      message: messageHTML,
      message_type: getMessageType(chatUsers, sendTo),
      recipient: getMessageRecepients(chatUsers, sendTo),
      fixed: false,
      sender_id: userId,
      sender_type: userType,
      attach_file_path: null,
    };

    console.log(sendTo);
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
