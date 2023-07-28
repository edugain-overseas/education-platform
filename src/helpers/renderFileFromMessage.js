import ReactPlayer from "react-player";
import { serverName } from "../constants/server";
import { getFileType } from "./getFileType";

export const renderFileFromMessage = (file) => {
    switch (getFileType(file.mime_type)) {
      case "image":
        return (
          <img
            key={file.fileId}
            src={`${serverName}${file.file_path}`}
            alt="from chat"
            width="100%"
            height="auto"
          />
        );
      case "video":
        return (
          <ReactPlayer
            key={file.fileId}
            url={`${serverName}${file.file_path}`}
            controls={true}
            width="100%"
            height="auto"
          />
        );
      case "audio":
        return (
          <audio
            key={file.fileId}
            src={`${serverName}${file.file_path}`}
            controls={true}
            width="true"
            height="auto"
          />
        );
      default:
        return null;
    }
  };