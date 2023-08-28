import { Modal } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSubjectIcons } from "../../../redux/subject/subjectSelectors";
import { serverName } from "../../../constants/server";
import { ReactComponent as DownloadIcon } from "../../../images/icons/download.svg";
import { useDispatch } from "react-redux";
import { uploadSubjectIconThunk } from "../../../redux/subject/subjectOperations";
import { useParams } from "react-router-dom";
import styles from "./IconModal.module.scss";

export default function IconModal({ itemId, isOpen, closeModal, setNewIcon }) {
  const inputFile = useRef(null);
  const [choosenIcon, setChoosenIcon] = useState("");
  const iconsData = useSelector(getSubjectIcons);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSubmit = async () => {
    if (choosenIcon) {
      setNewIcon(itemId, choosenIcon);
    }
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    dispatch(
      uploadSubjectIconThunk({ subjectId: parseInt(id), file: formData })
    );
  };

  const handleIconBtnClick = (iconPath) => {
    if (choosenIcon === iconPath) {
      setChoosenIcon("");
      return;
    }
    setChoosenIcon(iconPath);
  };

  return (
    <Modal
      open={isOpen}
      title="Choose icon"
      onOk={handleSubmit}
      onCancel={closeModal}
      destroyOnClose={true}
      footer={[
        <div className={styles.footerWrapper} key="footer">
          <button
            className={styles.uploadBtn}
            onClick={() => inputFile.current.click()}
            key="upload button"
          >
            <DownloadIcon />
            <input
              type="file"
              accept="image/svg+xml"
              onChange={handleUpload}
              style={{ display: "none" }}
              ref={inputFile}
            />
          </button>
          {choosenIcon && (
            <button
              key="submit"
              className={styles.submitBtn}
              onClick={handleSubmit}
            >
              Ok
            </button>
          )}
        </div>,
      ]}
    >
      <ul className={styles.iconsList}>
        {iconsData.map((icon, index) => (
          <li
            key={icon.id}
            className={
              icon.is_default
                ? choosenIcon === icon.icon_path
                  ? `${styles.iconItem} ${styles.defaultIconItem} ${styles.choosen}`
                  : `${styles.iconItem} ${styles.defaultIconItem}`
                : choosenIcon === icon.icon_path
                ? `${styles.iconItem} ${styles.choosen}`
                : styles.iconItem
            }
          >
            <button onClick={() => handleIconBtnClick(icon.icon_path)}>
              <img
                src={`${serverName}${icon.icon_path}`}
                alt={`icon ${index + 1}`}
                className={styles.icon}
              />
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
