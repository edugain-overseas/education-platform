import React, { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as PhotoIcon } from "../../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/voice.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/picture.svg";
import { WebcamPhotoModal } from "./WebcamPhotoModal/WebcamPhotoModal";
import WebcamVideoModal from "./WebcamVideoModal/WebcamVideoModal";
import MicModal from "./MicModal/MicModal";
import { useDispatch } from "react-redux";
import { attachFileToMessageThunk } from "../../../../../redux/groupChat/groupChatOperations";
import { attachFileToMessageThunk as attachFileToSubjectMessageThunk } from "../../../../../redux/subjectChats/subjectChatOperations";
import { attachFileToMessageThunk as attachFileToTeacherSubjectMessageThunk } from "../../../../../redux/chats/chatOperations";
import { TypeContext } from "../../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import { useSelector } from "react-redux";
import { getUserType } from "../../../../../redux/user/userSelectors";
import styles from "./AttachModal.module.scss";

export const AttachModal = ({ type, chatData = null }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const userType = useSelector(getUserType);
  console.log(chatData);

  const chatType = useContext(TypeContext) || "main";

  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleInputFileChange = (e) => {
    const formData = new FormData();
    const uniqueId = uuidv4();
    const file = e.target.files[0];
    const fileName = `${uniqueId}_${file.name}`;
    formData.append("file", file, fileName);
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

  const chooseType = () => {
    switch (type) {
      case "photo": {
        return (
          <ul>
            <li>
              <button type="button" onClick={openModal}>
                <PhotoIcon />
                Camera
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => imageInputRef.current.click()}
              >
                <PictureIcon />
                Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleInputFileChange}
              />
            </li>
          </ul>
        );
      }
      case "video": {
        return (
          <ul>
            <li>
              <button type="button" onClick={openModal}>
                <VideoIcon />
                Camera
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => videoInputRef.current.click()}
              >
                <PictureIcon />
                Video
              </button>
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={handleInputFileChange}
              />
            </li>
          </ul>
        );
      }
      case "audio": {
        return (
          <ul>
            <li>
              <button type="button" onClick={openModal}>
                <AudioIcon />
                Microphone
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => audioInputRef.current.click()}
              >
                <PictureIcon />
                Audio
              </button>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                onChange={handleInputFileChange}
              />
            </li>
          </ul>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalWrapper}>
      {chooseType()}
      <WebcamPhotoModal
        isOpenModal={isOpenModal && type === "photo"}
        closeModal={closeModal}
        chatData={chatData}
      />
      <WebcamVideoModal
        isOpenModal={isOpenModal && type === "video"}
        closeModal={closeModal}
        chatData={chatData}
      />
      <MicModal
        isOpenModal={isOpenModal && type === "audio"}
        closeModal={closeModal}
        chatData={chatData}
      />
    </div>
  );
};
