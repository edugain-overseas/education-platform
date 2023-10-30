import React, { useState } from "react";
import { Modal } from "antd";
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
import styles from "./PresentationPart.module.scss";
import { serverName } from "../../../../../../constants/server";
import PDFReader from "../../../../../shared/PDFReader/PDFReader";
import Dragger from "../../../../../shared/Dragger/Dragger";

const PresentationPart = ({ state, setState }) => {
  const [isEditValue, setIsEditValue] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const setPresentationFile = ({ fileName, fileSize, filePath }) => {
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          part.fileName = fileName;
          part.fileSize = fileSize;
          part.filePath = filePath;
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

  const handleOpenModal = (open) => {
    const modalRef = document.querySelector(".ant-modal-wrap.pdfReader");
    const modalBodyRef = modalRef.querySelector(".ant-modal-body");
    const handleClick = (e) => {
      if (e.target === e.currentTarget) {
        setFullscreen(false);
      }
    };
    if (open) {
      modalBodyRef.addEventListener("click", handleClick);
    }
  };

  return (
    <>
      <div className={styles.presentWrapper}>
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
        <div className={styles.mainContentWrapper}>
          {state.filePath !== "" ? (
            <div className={styles.pdfReaderWrapper}>
              <PDFReader
                pdf={`${serverName}${state.filePath}`}
                fullscreen={fullscreen}
                setFullscreen={setFullscreen}
              />
              <Modal
                open={fullscreen}
                afterOpenChange={handleOpenModal}
                footer={null}
                closeIcon={null}
                mask={false}
                width="100vw"
                wrapClassName="pdfReader"
                destroyOnClose
                style={{
                  inset: 0,
                  height: "100vh",
                  padding: 0,
                  maxWidth: "initial",
                }}
                bodyStyle={{
                  padding: "20rem 0",
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PDFReader
                  pdf={`${serverName}${state.filePath}`}
                  fullscreen={fullscreen}
                  setFullscreen={setFullscreen}
                />
              </Modal>
            </div>
          ) : (
            <Dragger
              styles={styles}
              setFileResponse={setPresentationFile}
              accept={".pdf"}
              title="Click or drag to download presentation"
            />
          )}
        </div>
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
    </>
  );
};

export default PresentationPart;
