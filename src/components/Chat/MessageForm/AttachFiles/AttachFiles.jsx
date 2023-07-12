import React, { useState } from "react";
import { ReactComponent as PhotoIcon } from "../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../images/icons/voice.svg";
import { ReactComponent as FileIcon } from "../../../../images/icons/file.svg";
import { Popconfirm } from "antd";
import { AttachModal } from "./AttachModal/AttachModal";
import './Popconfirm.css'
import styles from "./AttachFiles.module.scss";

export const AttachFiles = ({show}) => {
  const [type, setType] = useState("");

  const handleClick = (name) => {
    setType(name);
    console.log("open");
  };

  return (
    <div className={styles.mainWrapper} style={{display: show ? 'inline-flex' : 'none'}}>
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type}/>}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName='popconfirmOverlay'
          zIndex={999}
        >
          <button type="button" onClick={() => handleClick("photo")} className={styles.openPopupButton}>
            <PhotoIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type} />}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName='popconfirmOverlay'
        >
          <button type="button" onClick={() => handleClick("video")}>
            <VideoIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <Popconfirm
          placement="bottomLeft"
          title={null}
          description={<AttachModal type={type} />}
          showCancel={false}
          icon={null}
          okButtonProps={{ style: { display: "none" } }}
          overlayClassName='popconfirmOverlay'
        >
          <button type="button" onClick={() => handleClick("audio")}>
            <AudioIcon />
          </button>
        </Popconfirm>
      </div>
      <div className={styles.btnWrapper}>
        <button type="button">
          <FileIcon />
        </button>
      </div>
    </div>
  );
};
