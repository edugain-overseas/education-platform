import React, { useContext, useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
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
import styles from "./AttachFiles.module.scss";
import { TypeContext } from "../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";

export const AttachFiles = ({ show }) => {
  const [type, setType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const chatType = useContext(TypeContext) || "group";

  const handleClick = (name) => {
    setType(name);
    console.log("open");
  };

  const handleInputFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    // const uniqueId = uuidv4();
    const formData = new FormData();
    const fileName = `${file.size}_${file.name}`;
    console.log(file);
    formData.append("file", file, fileName);
    console.log(chatType);
    dispatch(
      chatType === "group"
        ? attachFileToMessageThunk(formData)
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
          description={<AttachModal type={type} />}
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
          description={<AttachModal type={type} />}
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
          description={<AttachModal type={type} />}
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
