import React, { useContext, useState } from "react";
import { Popover } from "antd";
import { ReactComponent as AttachIcon } from "../../../../images/icons/attachment.svg";
import { ReactComponent as ImageIcon } from "../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../images/icons//video.svg";
import { ReactComponent as AudioIcon } from "../../../../images/icons/voice.svg";
import { ReactComponent as FileIcon } from "../../../../images/icons/file.svg";
import { ReactComponent as DeleteIcon } from "../../../../images/icons/trash.svg";
import { useDispatch } from "react-redux";
import { deleteFileThunk } from "../../../../redux/groupChat/groupChatOperations";
import { deleteSubjectFileThunk } from "../../../../redux/subjectChats/subjectChatOperations";
import { deleteSubjectFileThunk as deleteTeacherSubjectFileThunk } from "../../../../redux/chats/chatOperations";
import { TypeContext } from "../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import styles from "./AttachedFilesPopover.module.scss";
import { getUserType } from "../../../../redux/user/userSelectors";

const Title = () => <h4 className={styles.popoverTitle}>Attached files</h4>;

const Content = ({ files, chatData }) => {
  console.log(chatData);
  const [deleteFilePath, setDeleteFilePath] = useState("");
  const chatType = useContext(TypeContext) || "main";
  const dispatch = useDispatch();
  const isLoadingFiles = chatData.attachedFilesToMessage.isLoading;
  const userType = useSelector(getUserType);

  const handleDeleteClick = (filePath) => {
    setDeleteFilePath(filePath);
    handleDelete(filePath);
  };

  const handleDelete = (filePath) => {
    dispatch(
      chatType === "main"
        ? userType === "teacher"
          ? deleteTeacherSubjectFileThunk({
              subjectId: chatData.subjectId,
              data: filePath,
            })
          : deleteFileThunk(filePath)
        : deleteSubjectFileThunk(filePath)
    );
  };

  const getIconByMimeType = (type) => {
    switch (type.split("/")[0]) {
      case "image":
        return <ImageIcon />;
      case "video":
        return <VideoIcon />;
      case "audio":
        return <AudioIcon />;
      default:
        return <FileIcon />;
    }
  };
  return (
    <ul className={styles.filesList}>
      {files.map((file, index) => {
        console.log(file);
        const fileName = file.path
          .split("/")
          [file.path.split("/").length - 1].split(".")[0];

        const fileNameEnd = file.path.split(".")[1];

        return (
          <li key={index}>
            <div>
              {getIconByMimeType(file.type)}
              <p>
                {fileName.length > 15
                  ? fileName.slice(0, 15) + "... "
                  : fileName}
                .{fileNameEnd}
              </p>
            </div>
            {isLoadingFiles && file.path === deleteFilePath ? (
              <TailSpin
                height="100%"
                width="100%"
                color="#4171cd"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDeleteClick(file.path)}
                disabled={isLoadingFiles && deleteFilePath !== file.path}
              >
                <DeleteIcon />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const AttachedFilesPopover = ({ files, chatData }) => {
  return (
    <Popover
      placement="bottomLeft"
      title={<Title />}
      content={<Content files={files} chatData={chatData}/>}
      arrow={false}
    >
      <button type="button" className={styles.attachBtn}>
        <AttachIcon />
      </button>
    </Popover>
  );
};

export default AttachedFilesPopover;
