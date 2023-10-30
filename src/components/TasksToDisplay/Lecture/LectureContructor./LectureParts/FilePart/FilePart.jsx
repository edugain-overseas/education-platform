import React, { useState } from "react";
import { getStringFromHTMLString } from "../../../../../../helpers/getStringFromHTMLString";
import SuperInput from "../../../../../shared/SuperInput/SuperInput";
import { ReactComponent as EditIcon } from "../../../../../../images/icons/editBlack.svg";
import { ReactComponent as SumbitIcon } from "../../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../../images/icons/cross.svg";
import { ReactComponent as DragIcon } from "../../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../images/icons/minus.svg";
import { ReactComponent as HideIcon } from "../../../../../../images/icons/displayOff.svg";
import { ReactComponent as DetailsIcon } from "../../../../../../images/icons/details.svg";
// import { ReactComponent as TrashIcon } from "../../../../../../images/icons/trash.svg";
import Dragger from "../../../../../shared/Dragger/Dragger";
import styles from "./FilePart.module.scss";
import DocumentInfoCard from "../../../../../shared/DocumentInfoCard/DocumentInfoCard";

const FilePart = ({ state, setState }) => {
  const [isEditValue, setIsEditValue] = useState(false);

  const addFiles = (newFile) => {
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          part.attributeFiles.push({
            ...newFile,
            downloadAllowed: false,
          });
        }
        return part;
      });
      return updatedState;
    });
  };

  const handleSumbit = () => {
    setIsEditValue(false);
  };

  const handleCancel = () => {
    setIsEditValue(false);
  };

  const onTextChange = (value) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            attributeText: value,
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  const onTitleChange = (value) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            attributeTitle: value,
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  const handleDelete = (file, index) => {
    console.log(file, index);
  };

  return (
    <div className={styles.filesWrapper}>
      {isEditValue ? (
        <SuperInput
          state={state.attributeTitle}
          setState={onTitleChange}
          placeholder="Please write your titule here..."
          styles={styles}
        />
      ) : (
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: getStringFromHTMLString(state.attributeTitle)
              ? state.attributeTitle
              : "<span style=color:#D9D9D9>Please write your title here...</span>",
          }}
        ></p>
      )}
      {state.attributeFiles.length !== 0 && (
        <div className={styles.documentsCardsWrapper}>
          {state.attributeFiles.map((file, index) => (
            <DocumentInfoCard
              key={index}
              file={file}
              handleDelete={() => handleDelete(file, index)}
              styles={styles}
            />
          ))}
        </div>
      )}
      <Dragger
        styles={styles}
        setFileResponse={addFiles}
        accept={
          "application/pdf, application/msword, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/json, application/zip, application/x-rar-compressed, text/plain"
        }
        title="Click or drag to download document"
        multiple={true}
        size="small"
      />

      {isEditValue ? (
        <SuperInput
          state={state.attributeText}
          setState={onTextChange}
          placeholder="Please write your titule here..."
          styles={styles}
        />
      ) : (
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: getStringFromHTMLString(state.attributeText)
              ? state.attributeText
              : "<span style=color:#D9D9D9>Please write your text here...</span>",
          }}
        ></p>
      )}

      <div className={styles.editPanel}>
        {isEditValue ? (
          <>
            <button onClick={handleSumbit}>
              <SumbitIcon />
            </button>
            <button onClick={handleCancel}>
              <CancelIcon />
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditValue(true)}>
            <EditIcon />
          </button>
        )}
        <button>
          <DragIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
        <button>
          <HideIcon />
        </button>
        <button className={styles.detailsBtn}>
          <DetailsIcon />
        </button>
      </div>
    </div>
  );
};

export default FilePart;
