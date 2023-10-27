import React, { useState } from "react";
import { Progress, Upload, message } from "antd";
import { instance } from "../../../services/instance";
import { ReactComponent as UploadIcon } from "../../../images/icons/uploadBig.svg";

const { Dragger: AtndDragger } = Upload;

const Dragger = ({
  styles,
  setFileResponse = () => null,
  accept,
  title,
  size = "default",
  multiple = false,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [percent, setPercent] = useState(null);

  const handleUploadFile = async (info) => {
    const { file, onSuccess, onError, onProgress } = info;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.post(`/lecture/upload/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({ percent: percentCompleted }, file);
          setPercent(percentCompleted);
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setFileResponse(data);
        onSuccess();
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      onError(error);
    }
  };

  const props = {
    name: "presentation",
    accept: accept,
    showUploadList: false,
    multiple: multiple,
    onChange(info) {
      const { status } = info.file;
      const percentage = info.event?.percent;
      if (status === "uploading" && percentage) {
        setPercent(percentage);
      }
      if (status !== "uploading") {
        setPercent(null);
      }
      if (status === "done") {
        messageApi.success({
          content: `${info.file.name} file uploaded successfully.`,
        });
      } else if (status === "error") {
        message.error({
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
  };

  return (
    <>
      {contextHolder}
      <div className={styles.fileWrapper}>
        <AtndDragger
          {...props}
          className={styles.dragger}
          customRequest={handleUploadFile}
        >
          {!percent && (
            <div className={styles.draggerContainer}>
              <UploadIcon />
              <p>{title}</p>
            </div>
          )}
        </AtndDragger>
        {percent && (
          <div className={styles.progressWrapper}>
            <Progress
              type="circle"
              percent={percent}
              format={(percent) => `${percent}%`}
              status={percent === 100 ? "success" : "active"}
              size={size}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dragger;
