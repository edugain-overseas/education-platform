import React, { useContext, useRef, useState } from "react";
import { ReactComponent as PhotoIcon } from "../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../images/icons/voice.svg";
import { ReactComponent as FileIcon } from "../../../../images/icons/file.svg";
import { Popconfirm } from "antd";
import { AttachModal } from "./AttachModal/AttachModal";
import "./Popconfirm.css";
import { useDispatch } from "react-redux";
import { attachFileToMessageThunk } from "../../../../redux/groupChat/groupChatOperations";
import { attachFileToMessageThunk as attachFileToSubjectMessageThunk } from "../../../../redux/subjectChats/subjectChatOperations";
import { attachFileToMessageThunk as attachFileToTeacherSubjectMessageThunk } from "../../../../redux/chats/chatOperations";
import styles from "./AttachFiles.module.scss";
import { TypeContext } from "../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import { useSelector } from "react-redux";
import { getUserType } from "../../../../redux/user/userSelectors";

export const AttachFiles = ({ show, chatData = null }) => {
  const [type, setType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const chatType = useContext(TypeContext) || "main";
  const userType = useSelector(getUserType);

  const handleClick = (name) => {
    setType(name);
    console.log("open");
  };

  const handleInputFileChange = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    const fileName = `${file?.size}_${file?.name}` || '';
    console.log(file);
    formData.append("file", file, fileName);
    console.log(chatType);
    dispatch(
      chatType === "main"
        ? userType === "teacher"
          ? attachFileToTeacherSubjectMessageThunk({
              subjectId: chatData.subjectId,
              data: formData,
            })
          : attachFileToMessageThunk(formData)
        : attachFileToSubjectMessageThunk(formData)
    );
  };

  return (
    <div
      className={styles.mainWrapper}
      style={{ display: show ? "inline-flex" : "none" }}
    >
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type} chatData={chatData}/>}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName="popconfirmOverlay"
          zIndex={999}
        >
          <button
            type="button"
            onClick={() => handleClick("photo")}
            className={styles.openPopupButton}
          >
            <PhotoIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type} chatData={chatData} />}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName="popconfirmOverlay"
          zIndex={999}
        >
          <button
            type="button"
            onClick={() => handleClick("video")}
            className={styles.openPopupButton}
          >
            <VideoIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type} chatData={chatData} />}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName="popconfirmOverlay"
          zIndex={999}
        >
          <button
            type="button"
            onClick={() => handleClick("audio")}
            className={styles.openPopupButton}
          >
            <AudioIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <button
          type="button"
          className={styles.openPopupButton}
          onClick={() => fileInputRef.current.click()}
        >
          <FileIcon />
        </button>
        <input
          type="file"
          accept="application/pdf, application/msword, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/json, application/zip, application/x-rar-compressed, text/plain"
          ref={fileInputRef}
          onChange={handleInputFileChange}
        />
      </div>
    </div>
  );
};
