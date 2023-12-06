import { serverName } from "../constants/server";
import { getFileType } from "./getFileType";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import { ReactComponent as DocumentIcon } from "../images/icons/fileFilled.svg";
import { ReactComponent as DownloadIcon } from "../images/icons/downloadBigger.svg";
import { formatSize } from "./formatSize";

export const renderFileFromMessage = (file, styles = {}) => {
  switch (getFileType(file.mimeType)) {
    case "image":
      return (
        <img
          key={file.fileId}
          src={`${serverName}${file.filePath}`}
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
          src={`${serverName}${file.filePath}`}
          controls={true}
          width="true"
          height="auto"
        />
      );
    default:
      const { fileName, fileSize, filePath } = file;
      const fileNameArray = fileName?.split("_") || [];
      if (fileNameArray.length > 1) {
        fileNameArray.shift();
      }
      const name = fileNameArray.join("_");

      const fileFormatLabelArray =
        fileNameArray[fileNameArray.length - 1].split(".");
      const fileFormatLabel =
        fileFormatLabelArray[fileFormatLabelArray.length - 1];

      const size = formatSize(fileSize);

      return (
        <div className={styles.documentWrapper} key={file.fileId}>
          <div className={styles.fileInfoWrapper}>
            <div className={styles.iconWrapper}>
              <DocumentIcon />
              <span className={styles.format}>{fileFormatLabel}</span>
            </div>
            <span className={styles.name}>{name}</span>
            <span className={styles.size}>{size}</span>
          </div>
          <a
            download={name}
            href={`${serverName}${filePath}`}
            className={styles.downloadLink}
          >
            <DownloadIcon />
          </a>
        </div>
      );
  }
};
