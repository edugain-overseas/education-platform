import React, { useState, useContext } from "react";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUserType } from "../../../redux/user/userSelectors";
import { AttachFiles } from "./AttachFiles/AttachFiles";
import { HtmlRegExp } from "../../../constants/regExp";
import { getMessageTypeByRecepient } from "../../../helpers/getMessageTypeByRecepient";
import { getMessageRecepients } from "../../../helpers/getMessageRecepients";
import {
  clearAttachedFiles,
  setFeedback,
} from "../../../redux/groupChat/groupChatSlice";
import {
  clearAttachedFiles as clearSubjectAttachedFiles,
  setFeedback as setSubjectFeedback,
} from "../../../redux/subjectChats/subjectChatSlice";
import { getMessageType } from "../../../helpers/getMessageType";
import {
  getAttachedFiles,
  getFeedbackData,
  getParticipantsData,
} from "../../../redux/groupChat/groupChatSelectors";
import { WebsocketContext } from "../../../App";
import { SubjectWebsocketContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseDetailPage";
import {
  getSubjectAttachedFiles,
  getSubjectFeedbackData,
  getSubjectParticipantsData,
} from "../../../redux/subjectChats/subjectChatSelectors";
import styles from "./MessageForm.module.scss";
import { TypeContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";

export function MessageForm() {
  const [messageHTML, setMessageHTML] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const type = useContext(TypeContext) || "group";

  const socket = useContext(
    type === "group" ? WebsocketContext : SubjectWebsocketContext
  );
  const dispatch = useDispatch();

  const userId = useSelector(getUserId);
  const participantsData = useSelector(
    type === "group" ? getParticipantsData : getSubjectParticipantsData
  );
  const userType = useSelector(getUserType);
  const attachedFiles = useSelector(
    type === "group" ? getAttachedFiles : getSubjectAttachedFiles
  );
  const replyTo = useSelector(
    type === "group" ? getFeedbackData : getSubjectFeedbackData
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      messageHTML.replaceAll(HtmlRegExp, "").trim() === "" &&
      attachedFiles.length === 0
    ) {
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

    if (replyTo) {
      delete data.message_type;
      delete data.fixed;
      delete data.recipient;
      data.message_id = replyTo;
    }

    try {
      socket.send(JSON.stringify(data));
    } catch (error) {}
    dispatch(
      type === "group" ? clearAttachedFiles() : clearSubjectAttachedFiles()
    );
    dispatch(type === "group" ? setFeedback(null) : setSubjectFeedback(null));
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
