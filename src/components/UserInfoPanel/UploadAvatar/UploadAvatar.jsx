import React, { useState } from "react";
import styles from "./UploadAvatar.module.scss";
import { useDispatch } from "react-redux";
import { changeUserAvatarThunk } from "../../../redux/user/userOperations";

export const AvatarUpload = () => {
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const fileData = new FormData();
    fileData.append("file", event.target.files[0]);
    dispatch(changeUserAvatarThunk(fileData));
    setFile(event.target.files[0])
  };

  return (
    <label type="button" htmlFor="avatar" className={styles.uploadButton}>
      <input type="file" name="avatar" value={file} onChange={handleChange} />
      <span className={styles.plus}>+</span>
      <span className={styles.upload}>Upload</span>
    </label>
  );
};
