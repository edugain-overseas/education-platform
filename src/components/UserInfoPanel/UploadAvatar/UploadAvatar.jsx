import React, { useRef } from "react";
import styles from "./UploadAvatar.module.scss";
import { useDispatch } from "react-redux";
import { changeUserAvatarThunk } from "../../../redux/user/userOperations";

export const AvatarUpload = () => {
  const inputUpload = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const fileData = new FormData();
    fileData.append("file", event.target.files[0]);
    dispatch(changeUserAvatarThunk(fileData));
  };

  return (
    <label
      type="button"
      htmlFor="avatar"
      className={styles.uploadButton}
      onClick={()=>inputUpload.current.click()}
    >
      <input
        type="file"
        name="avatar"
        onChange={handleChange}
        ref={inputUpload}
        hidden
      />
      <span className={styles.plus}>+</span>
      <span className={styles.upload}>Upload</span>
    </label>
  );
};
