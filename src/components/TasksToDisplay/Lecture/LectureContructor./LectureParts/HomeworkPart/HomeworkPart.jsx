import React, { useState } from "react";
import { getStringFromHTMLString } from "../../../../../../helpers/getStringFromHTMLString";
import SuperInput from "../../../../../shared/SuperInput/SuperInput";
import { ReactComponent as EditIcon } from "../../../../../../images/icons/editBlack.svg";
import { ReactComponent as SumbitIcon } from "../../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../../images/icons/cross.svg";
import { ReactComponent as DragIcon } from "../../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../images/icons/minus.svg";
import { ReactComponent as HideIcon } from "../../../../../../images/icons/displayOff.svg";
import { ReactComponent as ShowIcon } from "../../../../../../images/icons/displayOn.svg";
import { ReactComponent as DetailsIcon } from "../../../../../../images/icons/details.svg";
import { ReactComponent as TrashIcon } from "../../../../../../images/icons/trashRounded.svg";
import { ReactComponent as LinkIcon } from "../../../../../../images/icons/link.svg";
import Dragger from "../../../../../shared/Dragger/Dragger";
import DocumentInfoCard from "../../../../../shared/DocumentInfoCard/DocumentInfoCard";
import {
  deleteLectureFileThunk,
  deleteSectionThunk,
  updateLectureFilesThunk,
  updateLectureLinkThunk,
  updateLectureTextThunk,
} from "../../../../../../redux/task/taskOperation";
import { useDispatch } from "react-redux";
import styles from "./HomeworkPart.module.scss";
import LinkCard from "../../../../../shared/LinkCard/LinkCard";

const HomeworkPart = ({ state, setState, dragHandleProps }) => {
  const [isEditValue, setIsEditValue] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [newAnchor, setNewAnchor] = useState("");
  const dispatch = useDispatch();

  const handleSumbitNewLink = () => {
    if (newLink === "") {
      return;
    }
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          if (state.attributeId) {
            dispatch(
              updateLectureLinkThunk({
                attrId: state.attributeId,
                updatedData: {
                  attributeLinks: [
                    ...part.attributeLinks.map(({ link, anchor }) => ({
                      link,
                      anchor,
                    })),
                    { link: newLink, anchor: newAnchor },
                  ],
                },
              })
            );
          }
          return {
            ...part,
            attributeLinks: [
              ...part.attributeLinks,
              { link: newLink, anchor: newAnchor },
            ],
          };
        }
        return part;
      });
      return updatedState;
    });
    setNewLink("");
    setNewAnchor("");
  };

  const handleDeleteLink = (index) => {
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          dispatch(
            updateLectureLinkThunk({
              attrId: state.attributeId,
              updatedData: {
                attributeLinks: part.attributeLinks
                  .filter((_, i) => i !== index)
                  .map(({ link, anchor }) => ({ link, anchor })),
              },
            })
          );
          return {
            ...part,
            attributeLinks: part.attributeLinks.filter((_, i) => i !== index),
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  const addFiles = (newFile) => {
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          if (state.attributeId) {
            dispatch(
              updateLectureFilesThunk({
                attrId: state.attributeId,
                updatedData: {
                  attributeFiles: [
                    ...part.attributeFiles,
                    { ...newFile, downloadAllowed: false },
                  ],
                },
              })
            );
          }
          return {
            ...part,
            attributeFiles: [
              ...part.attributeFiles,
              { ...newFile, downloadAllowed: false },
            ],
          };
        }
        return part;
      });
      return updatedState;
    });
  };

  const handleSumbit = () => {
    if (state.attributeId) {
      dispatch(
        updateLectureTextThunk({
          attrId: state.attributeId,
          updatedData: {
            attributeText: state.attributeText,
            attributeTitle: state.attributeTitle,
          },
        })
      );
    }
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

  const handleDeleteFile = (filePath) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            attributeFiles: part.attributeFiles.filter(
              (file) => file.filePath !== filePath
            ),
          };
        }
        return part;
      });
      return updatedState;
    });

    if (state.attributeId) {
      dispatch(deleteLectureFileThunk(filePath));
    }
  };

  const handleDeleteSection = () => {
    setState((prev) => {
      const updatedState = prev.filter(({ id }) => id !== state.id);
      return updatedState;
    });
    if (state.attributeId) {
      dispatch(deleteSectionThunk(state.attributeId));
    }
  };

  const handleSwitchDisplay = () => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          if (part.attributeId) {
            dispatch(
              updateLectureTextThunk({
                attrId: part.attributeId,
                updatedData: {
                  hided: !part.hided,
                },
              })
            );
          }
          return {
            ...part,
            hided: !part.hided,
          };
        }
        return part;
      });
      return updatedState;
    });
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
      {state.attributeFiles?.length !== 0 && (
        <div className={styles.documentsCardsWrapper}>
          {state.attributeFiles?.map((file, index) => (
            <DocumentInfoCard
              key={file.fileId || index}
              file={file}
              handleDelete={handleDeleteFile}
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
      <div className={styles.linksWrapper}>
        {state.attributeLinks &&
          state.attributeLinks.length !== 0 &&
          state.attributeLinks.map(({ linkId, link, anchor }, index) => (
            <div key={linkId || index}>
              <LinkCard link={link} text={anchor} styles={styles} />
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteLink(index)}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        <div className={styles.newLinkWrapper}>
          <input
            type="text"
            className={styles.newLink}
            placeholder="Please write your link here..."
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <input
            type="text"
            className={styles.newAnchor}
            placeholder="Please write link label here..."
            value={newAnchor}
            onChange={(e) => setNewAnchor(e.target.value)}
          />
          <span className={styles.linkIcon}>
            <LinkIcon />
          </span>
          <button
            className={styles.submitNewLinkBtn}
            onClick={handleSumbitNewLink}
          >
            <SumbitIcon />
          </button>
        </div>
      </div>
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
        <button {...dragHandleProps}>
          <DragIcon />
        </button>
        <button onClick={handleDeleteSection}>
          <DeleteIcon />
        </button>
        <button onClick={handleSwitchDisplay}>
          {state.hided ? <HideIcon /> : <ShowIcon />}
        </button>
        <button className={styles.detailsBtn}>
          <DetailsIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeworkPart;
