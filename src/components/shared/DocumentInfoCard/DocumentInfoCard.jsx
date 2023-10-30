import React from "react";
import { serverName } from "../../../constants/server";
import { ReactComponent as DocumentIcon } from "../../../images/icons/document.svg";
import { ReactComponent as DownloadIcon } from "../../../images/icons/downloadBigger.svg";
import { ReactComponent as DeleteIcon } from "../../../images/icons/trash.svg";
import { formatSize } from "../../../helpers/formatSize";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";

const DocumentInfoCard = ({ file, handleDelete = () => {}, styles }) => {
  const { fileName, fileSize, filePath, fileType } = file;
  const isEdit = useSelector(getIsEdit);
  console.log(fileType);
  return (
    <div className={styles.attachedDocumentWrapper}>
      <DocumentIcon />
      <span className={styles.documentName}>{fileName}</span>
      <span className={styles.documentSize}>{formatSize(fileSize)}</span>
      <a
        download={true}
        href={`${serverName}${filePath}`}
        className={styles.downloadLink}
        rel="noreferrer noopener"
        target="_blank"
      >
        <DownloadIcon />
      </a>
      {isEdit && (
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default DocumentInfoCard;
