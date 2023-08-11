import { serverName } from "../constants/server";
import { getFileType } from "./getFileType";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

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
      return <VideoPlayer file={file} key={file.fileId} />;
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
