import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import { MultipleSelect } from "../MultipleSelect/MultipleSelect";
import { Quill } from "../Quill/Quill";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUserType } from "../../../redux/user/userSelectors";
import { AttachFiles } from "./AttachFiles/AttachFiles";
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
import {
  clearAttachedFiles as clearTeacherSubjectAttachedFiles,
  setFeedback as setTeacherSubjectFeedback,
} from "../../../redux/chats/chatsSlice";
import { getMessageType } from "../../../helpers/getMessageType";
import { WebsocketContext, WebsocketsContext } from "../../../App";
import { SubjectWebsocketContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseDetailPage";
import { TypeContext } from "../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import AttachedFilesPopover from "./AttachedFilesPopover/AttachedFilesPopover";
import EmojiPanel from "./EmojiPanel/EmojiPanel";
import { ReactComponent as PinIcon } from "../../../images/icons/pin.svg";
import { getStringFromHTMLString } from "../../../helpers/getStringFromHTMLString";
import styles from "./MessageForm.module.scss";
// import { EditMessage } from "../Chat";

export function MessageForm({ chatData = null }) {
  const [messageHTML, setMessageHTML] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [fixed, setFixed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const userType = useSelector(getUserType);
  
  // const editMessage = useContext(EditMessage)
  const type = useContext(TypeContext) || "main";
  
  // console.log(editMessage);

  let socket = useContext(
    type === "main"
      ? userType === "teacher"
        ? WebsocketsContext
        : WebsocketContext
      : SubjectWebsocketContext
  );
  if (type === "main" && userType === "teacher") {
    socket = socket.find(({ id }) => chatData.subjectId === id)?.websocket;
  }

  const dispatch = useDispatch();

  const userId = useSelector(getUserId);

  const participantsData = chatData?.participantsData;

  const attachedFiles = chatData?.attachedFilesToMessage?.filesData;

  const replyTo = chatData?.feedbackTo;

  const isLoadingFiles = chatData?.attachedFilesToMessage?.isLoading;

  // useEffect(()=>{
  //   if (editMessage) {
  //     setMessageHTML(editMessage.messageText)
  //   } else {
  //     setMessageHTML('')
  //   }
  // },[editMessage])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      getStringFromHTMLString(messageHTML) === "" &&
      attachedFiles.length === 0
    ) {
      return;
    }

    const chatUsers = participantsData?.map((user) => user.userId) || [];

    const data = {
      type: getMessageType(replyTo),
      message: messageHTML,
      messageType: getMessageTypeByRecepient(chatUsers, sendTo),
      recipient: getMessageRecepients(chatUsers, sendTo),
      fixed: fixed,
      senderId: userId,
      senderType: userType,
      attachFiles: attachedFiles,
    };

    if (replyTo) {
      delete data.messageType;
      delete data.fixed;
      delete data.recipient;
      data.messageId = replyTo;
    }
    console.log(data);
    try {
      socket.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
    dispatch(
      type === "main"
        ? userType === "teacher"
          ? clearTeacherSubjectAttachedFiles({ subjectId: chatData.subjectId })
          : clearAttachedFiles()
        : clearSubjectAttachedFiles()
    );
    dispatch(
      type === "main"
        ? userType === "teacher"
          ? setTeacherSubjectFeedback({
              subjectId: chatData.subjectId,
              data: null,
            })
          : setFeedback(null)
        : setSubjectFeedback(null)
    );
    setMessageHTML("");
    setFixed(false);
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

    if (e.relatedTarget && e.relatedTarget.className.includes("Emoji")) {
      return;
    }

    if (e.relatedTarget && e.relatedTarget.className.includes("pinBtn")) {
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
      {isFocused && <EmojiPanel onChange={setMessageHTML} />}
      {!fixed && <AttachFiles show={isFocused} chatData={chatData} />}

      {isLoadingFiles && attachedFiles.length === 0 ? (
        <div className={styles.attachBtnWrapper}>
          <TailSpin
            height="100%"
            width="100%"
            color="#4171cd"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        attachedFiles?.length !== 0 && (
          <div className={styles.attachBtnWrapper}>
            <AttachedFilesPopover files={attachedFiles} chatData={chatData} />
          </div>
        )
      )}
      {isFocused && (
        <button
          onClick={() => setFixed(!fixed)}
          type="button"
          className={
            fixed ? `${styles.pinBtn} ${styles.active}` : styles.pinBtn
          }
        >
          <PinIcon />
        </button>
      )}
      <div className={styles.toolbarRight}>
        {!replyTo && !fixed && (
          <MultipleSelect
            onChange={(values) => {
              setSendTo(values);
            }}
            chatData={chatData}
          />
        )}
        <button type="submit" className={styles.sendButton}>
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
