import React, { useRef } from "react";
import styles from "./UploadAvatar.module.scss";
import { useDispatch } from "react-redux";
import { changeUserAvatarThunk } from "../../../redux/user/userOperations";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";

export const AvatarUpload = () => {
  const inputUpload = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);
      dispatch(changeUserAvatarThunk(fileData));
    }
  };

  return (
    <label
      type="button"
      htmlFor="avatar"
      className={styles.uploadButton}
      onClick={() => inputUpload.current.click()}
    >
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
        ref={inputUpload}
        hidden
      />
      <span className={styles.icon}>
        <EditIcon />
      </span>
      <span className={styles.edit}>Edit</span>
    </label>
  );
};
