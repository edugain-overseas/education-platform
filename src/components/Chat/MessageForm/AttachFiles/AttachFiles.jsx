import React, { useState } from "react";
import { ReactComponent as PhotoIcon } from "../../../../images/icons/photo.svg";
import { ReactComponent as VideoIcon } from "../../../../images/icons/video.svg";
import { ReactComponent as AudioIcon } from "../../../../images/icons/voice.svg";
import { ReactComponent as FileIcon } from "../../../../images/icons/file.svg";

export default function AttachFiles() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [type, setType] = useState(null);

  const handleClick = (name) => {
    setIsShowModal(true);
    setType(name);
    console.log(isShowModal, type);
  };

  return (
    <div>
      <button onClick={()=>handleClick("photo")}>
        <PhotoIcon />
      </button>
      <button onClick={()=>handleClick("video")}>
        <VideoIcon />
      </button>
      <button onClick={()=>handleClick("audio")}>
        <AudioIcon />
      </button>
      <button onClick={()=>handleClick("file")}>
        <FileIcon />
      </button>
    </div>
  );
}
