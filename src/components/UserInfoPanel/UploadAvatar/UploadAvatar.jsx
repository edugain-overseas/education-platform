import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./UploadAvatar.module.scss";

export const AvatarUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      // Handle successful upload
      console.dir(info);
      message.success("Avatar uploaded successfully");
    } else if (info.file.status === "error") {
      // Handle upload error
      message.error("Avatar upload failed");
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
  };

  return (
    <Upload
      name="avatar"
      // action={uploadFile}
      customRequest={uploadFile}
      listType="picture-circle"
      className={styles.uploaderWrapper}
      showUploadList={false}
      onChange={handleAvatarChange}
    >
      <div>
        {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  );
};
