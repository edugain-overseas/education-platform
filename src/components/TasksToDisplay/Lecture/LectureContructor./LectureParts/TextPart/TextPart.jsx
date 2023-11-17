import React, { useState } from "react";
import SuperInput from "../../../../../shared/SuperInput/SuperInput";
import { getStringFromHTMLString } from "../../../../../../helpers/getStringFromHTMLString";
import { ReactComponent as EditIcon } from "../../../../../../images/icons/editBlack.svg";
import { ReactComponent as SumbitIcon } from "../../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../../images/icons/cross.svg";
import { ReactComponent as DragIcon } from "../../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../images/icons/minus.svg";
import { ReactComponent as HideIcon } from "../../../../../../images/icons/displayOff.svg";
import { ReactComponent as ShowIcon } from "../../../../../../images/icons/displayOn.svg";
import { ReactComponent as DetailsIcon } from "../../../../../../images/icons/details.svg";
import { useDispatch } from "react-redux";
import {
  deleteSectionThunk,
  updateLectureTextThunk,
} from "../../../../../../redux/task/taskOperation";
import styles from "./TextPart.module.scss";

const TextPart = ({ state, setState, dragHandleProps }) => {
  const [isEditValue, setIsEditValue] = useState(false);
  const dispatch = useDispatch();

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
    <div className={styles.textPartWrapper}>
      {isEditValue ? (
        <>
          <SuperInput
            state={state.attributeTitle}
            setState={onTitleChange}
            placeholder="Please write your titule here..."
            styles={styles}
          />
          <SuperInput
            state={state.attributeText}
            setState={onTextChange}
            placeholder="Please write your text here..."
            styles={styles}
          />
        </>
      ) : (
        <>
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: getStringFromHTMLString(state.attributeTitle)
                ? state.attributeTitle
                : "<span style=color:#D9D9D9>Please write your title here...</span>",
            }}
          ></p>
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: getStringFromHTMLString(state.attributeText)
                ? state.attributeText
                : "<span style=color:#D9D9D9>Please write your title here...</span>",
            }}
          ></p>
        </>
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

export default TextPart;
