import React, { useState } from "react";
import { ReactComponent as PhotoIcon } from "../../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/voice.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/picture.svg";
import styles from "./AttachModal.module.scss";
import { WebcamPhotoModal } from "./WebcamPhotoModal/WebcamPhotoModal";
import WebcamVideoModal from "./WebcamVideoModal/WebcamVideoModal";
import MicModal from "./MicModal/MicModal";

export const AttachModal = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
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
              <button type="button">
                <PictureIcon />
                Photo
              </button>
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
              <button type="button">
                <PictureIcon />
                Video
              </button>
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
              <button type="button">
                <PictureIcon />
                Audio
              </button>
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
      />
      <WebcamVideoModal
        isOpenModal={isOpenModal && type === "video"}
        closeModal={closeModal}
      />
      <MicModal
        isOpenModal={isOpenModal && type === "audio"}
        closeModal={closeModal}
      />
    </div>
  );
};
