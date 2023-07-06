import React, { useState } from "react";
import { ReactComponent as PhotoIcon } from "../../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/voice.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/picture.svg";
import styles from "./AttachModal.module.scss";
import { WebcamModal } from "./WebcamModal/WebcamModal";

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
              <button onClick={openModal}>
                <PhotoIcon />
                Camera
              </button>
            </li>
            <li>
              <button>
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
              <button>
                <VideoIcon />
                Camera
              </button>
            </li>
            <li>
              <button>
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
              <button>
                <AudioIcon />
                Microphone
              </button>
            </li>
            <li>
              <button>
                <PictureIcon />
                Audio
              </button>
            </li>
          </ul>
        );
      }
      default: return
    }
  };

  return (
    <div className={styles.modalWrapper}>
      {chooseType()}
      <WebcamModal isOpenModal={isOpenModal} closeModal={closeModal}/>
    </div>
  );
};
