import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import styles from "./MessageForm.module.scss";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUserType } from "../../../redux/user/userSelectors";
import { AttachFiles } from "./AttachFiles/AttachFiles";
import { HtmlRegExp } from "../../../constants/regExp";
import {
  getAttachedFiles,
  getFeedbackData,
  getMessages,
  getParticipantsData,
} from "../../../redux/chat/chatSelectors";
import { getMessageTypeByRecepient } from "../../../helpers/getMessageTypeByRecepient";
import { getMessageRecepients } from "../../../helpers/getMessageRecepients";
import { clearAttachedFiles, setFeedback } from "../../../redux/chat/chatSlice";
import { getMessageType } from "../../../helpers/getMessageType";

export function MessageForm({ socket }) {
  const [messageHTML, setMessageHTML] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector(getUserId);
  const participantsData = useSelector(getParticipantsData);
  const userType = useSelector(getUserType);
  const attachedFiles = useSelector(getAttachedFiles);
  const replyTo = useSelector(getFeedbackData);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      messageHTML.replaceAll(HtmlRegExp, "").trim() === "" &&
      attachedFiles.length === 0
    ) {
      console.log("Empty message");
      return;
    }

    const chatUsers = participantsData.map((user) => user.user_id);

    const data = {
      type: getMessageType(replyTo),
      message: messageHTML,
      message_type: getMessageTypeByRecepient(chatUsers, sendTo),
      recipient: getMessageRecepients(chatUsers, sendTo),
      fixed: false,
      sender_id: userId,
      sender_type: userType,
      attach_file_path: attachedFiles,
    };
    console.log(data);
    if (replyTo) {
      delete data.message_type;
      delete data.fixed;
      delete data.recipient;
      data.message_id = replyTo;
    }
    console.log(data);

    try {
      socket.send(JSON.stringify(data));
      console.log("sended");
    } catch (error) {
      console.log(error.message);
    }
    dispatch(clearAttachedFiles());
    dispatch(setFeedback(null));
    setMessageHTML("");
  };

  const handleFocusForm = (e) => {
    if (e.target.className.includes("ant")) {
      return;
    }
    setIsFocused(true);
  };

  const handleBlurForm = (e) => {
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
      onBlur={handleBlurForm}
    >
      <Quill
        onChange={setMessageHTML}
        value={messageHTML}
        focused={isFocused}
      />
      <AttachFiles show={isFocused} />
      <div className={styles.toolbarRight}>
        {!replyTo && (
          <MultipleSelect
            onChange={(values) => {
              setSendTo(values);
            }}
          />
        )}
        <button type="submit" className={styles.sendButton}>
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
