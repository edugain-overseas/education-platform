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
import { ReactComponent as ShowIcon } from "../../../../../../images/icons/displayOn.svg";
// import { ReactComponent as UploadIcon } from "../../../../../../images/icons/uploadBig.svg";
// import { ReactComponent as TrashIcon } from "../../../../../../images/icons/trash.svg";
import styles from "./PicturePart.module.scss";
import Dragger from "../../../../../shared/Dragger/Dragger";
import ImageGroup from "../../../../../shared/ImageGroup/ImageGroup";
import { useDispatch } from "react-redux";
import {
  deleteLectureFileThunk,
  deleteSectionThunk,
  updateLectureImagesThunk,
  updateLectureTextThunk,
} from "../../../../../../redux/task/taskOperation";

const PicturePart = ({ state, setState, dragHandleProps }) => {
  const [isEditValue, setIsEditValue] = useState(false);
  const dispatch = useDispatch();

  const addPictures = (newPicture) => {
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          if (state.attributeId) {
            dispatch(
              updateLectureImagesThunk({
                attrId: state.attributeId,
                updatedData: {
                  attributeImages: [
                    ...part.attributeImages,
                    {
                      imageName: newPicture.fileName,
                      imagePath: newPicture.filePath,
                      imageSize: newPicture.fileSize,
                      imageDescription: "",
                      downloadAllowed: false,
                    },
                  ],
                },
              })
            );
          }
          return {
            ...part,
            attributeImages: [
              ...part.attributeImages,
              {
                imageName: newPicture.fileName,
                imagePath: newPicture.filePath,
                imageSize: newPicture.fileSize,
                imageDescription: "",
                downloadAllowed: false,
              },
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

  const imgDescChange = (index, e) => {
    const value = e.target.value;
    setState((prev) => {
      const updatedState = prev.map((part) => {
        if (part.id === state.id) {
          part.attributeImages = part.attributeImages.map((image, i) => {
            if (i === index) {
              return {
                ...image,
                imageDescription: value,
              };
            }
            return image;
          });
        }
        return part;
      });
      return updatedState;
    });
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

  const handleDeleteFile = (imagePath) => {
    setState((prevState) => {
      const updatedState = prevState.map((part) => {
        if (part.id === state.id) {
          return {
            ...part,
            attributeImages: part.attributeImages.filter(
              (image) => image.imagePath !== imagePath
            ),
          };
        }
        return part;
      });
      return updatedState;
    });

    if (state.attributeId) {
      dispatch(deleteLectureFileThunk(imagePath));
    }
  };

  const handleInputBlur = () => {
    if (state.attributeId) {
      dispatch(
        updateLectureImagesThunk({
          attrId: state.attributeId,
          updatedData: {
            attributeImages: state.attributeImages,
          },
        })
      );
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
    <div className={styles.pictureWrapper}>
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
      {state.attributeImages.length !== 0 && (
        <ImageGroup
          imagesData={state.attributeImages}
          styles={styles}
          isDesc={true}
          setState={imgDescChange}
          handleDeleteFile={handleDeleteFile}
          handleInputBlur={handleInputBlur}
        />
      )}
      {state.attributeImages.length < 3 && (
        <Dragger
          styles={styles}
          setFileResponse={addPictures}
          accept="image/*"
          title="Click or drag to download pictures"
          size="default"
          multiple={true}
        />
      )}
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

export default PicturePart;
