import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as DragIcon } from "../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../../../images/icons/plusRounded.svg";
import { ReactComponent as EditIcon } from "../../../../../images/icons/editBlack.svg";
import { ReactComponent as SubmitIcon } from "../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../images/icons/cross.svg";
import { ReactComponent as DisplayOnIcon } from "../../../../../images/icons/displayOn.svg";
import { ReactComponent as DisplayOffIcon } from "../../../../../images/icons/displayOff.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../../images/icons/arrowDown.svg";
import styles from "./MatchingTest.module.scss";
import { getLetterVatiantsByIndex } from "../../../../../helpers/getLetterVatiantsByIndex";
import { Select } from "antd";

const MatchingTest = ({
  part,
  setParts,
  handleSubmitChanges,
  dragHandleProps,
  handleDeleteQuestion,
}) => {
  const [editble, setEditble] = useState(false);
  const {
    questionText,
    questionAnswers,
    questionScore,
    hided,
    questionNumber,
    leftOptions,
    rightOptions,
    isCorrect,
    questionId,
    id,
  } = part;
  console.log(part);

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionText: value,
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleOptionChange = (e, index, type) => {
    const value = e.target.value;
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            [type]: item[type].map((opt, i) => {
              if (i === index) {
                return value;
              }
              return opt;
            }),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleAddOption = (type) => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            [type]: [...item[type], ""],
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleDeleteOption = (index, type) => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            [type]: item[type].filter((opt, i) => i !== index),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleDragEnd = ({ source, destination }) => {
    console.log(source, destination);
    const { index: startIndex, droppableId } = source;
    if (!destination) {
      return;
    }
    const endIndex = destination.index;
    if (endIndex === startIndex) {
      return;
    }
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          const updatedOptions = [...item[droppableId]];
          const [removed] = updatedOptions.splice(startIndex, 1);
          updatedOptions.splice(endIndex, 0, removed);
          return { ...item, [droppableId]: updatedOptions };
        }
        return item;
      });
      return updatedState;
    });
  };

  const getOptions = () =>
    rightOptions.map((opt, index) => ({
      key: index,
      value: opt,
      label: getLetterVatiantsByIndex(index)[0],
      disabled: questionAnswers.find(({ rightText }) => rightText === opt),
    }));

  const handleClear = (leftOption) => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionAnswers: item.questionAnswers.map((ans) => {
              if (ans.leftText === leftOption) {
                return {
                  ...ans,
                  rightText: "",
                };
              }
              return ans;
            }),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleChooseOption = (value, leftOption) => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          if (!item.questionAnswers.length) {
            return {
              ...item,
              questionAnswers: item.leftOptions.map((opt) => ({
                leftText: opt,
                rightText: opt === leftOption ? value : "",
              })),
            };
          }

          return {
            ...item,
            questionAnswers: item.questionAnswers.map((ans) => {
              if (ans.leftText === leftOption) {
                return {
                  ...ans,
                  rightText: value,
                };
              }
              return ans;
            }),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const setCorrect = () => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            isCorrect: !item.isCorrect,
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleScoreChange = (e) => {
    const { value } = e.target;
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionScore: value,
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleSubmit = () => {
    if (!isCorrect) {
      return;
    }
    if (questionId) {
      handleSubmitChanges(questionId);
    }
    setEditble(false);
  };

  return (
    <div
      className={
        editble ? styles.wrapper : `${styles.wrapper} ${styles.disabled}`
      }
    >
      <div className={styles.questionWrapper}>
        <h2>
          {questionNumber + ") "}
          {questionText === "" ? "Your question" : questionText}
        </h2>
        <span>Grade / {questionScore}</span>
      </div>
      <label className={styles.questionInputWrapper}>
        <span>Question:</span>
        <input
          type="text"
          value={questionText}
          onChange={(e) => handleQuestionChange(e)}
          placeholder="Please write your question here..."
        />
      </label>
      <div className={styles.answersWrapper}>
        {questionAnswers.length !== 0 && (
          <span className={styles.answersTitle}>Answer options:</span>
        )}
        <div className={styles.optionsWrapper}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="leftOptions">
              {(provided, { isDraggingOver }) => (
                <div
                  className={styles.leftOptionsWrapper}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {leftOptions.map((opt, index) => (
                    <Draggable
                      key={index}
                      draggableId={`${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={styles.optionWrapper}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className={styles.inputWrapper}>
                            <span>{`${index + 1}) `}</span>
                            <input
                              type="text"
                              placeholder="Please write your possible answer here..."
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(e, index, "leftOptions")
                              }
                            />
                          </div>
                          <div className={styles.subPanelWrapper}>
                            <button {...provided.dragHandleProps}>
                              <DragIcon />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteOption(index, "leftOptions")
                              }
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="rightOptions">
              {(provided) => (
                <div
                  className={styles.rightOptionsWrapper}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {rightOptions.map((opt, index) => (
                    <Draggable
                      key={index}
                      draggableId={`${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={styles.optionWrapper}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className={styles.inputWrapper}>
                            <span>{`${getLetterVatiantsByIndex(index)} `}</span>
                            <input
                              type="text"
                              placeholder="Please write your possible answer here..."
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(e, index, "rightOptions")
                              }
                            />
                          </div>
                          <div className={styles.subPanelWrapper}>
                            <button {...provided.dragHandleProps}>
                              <DragIcon />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteOption(index, "rightOptions")
                              }
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={styles.addBtnsWrapper}>
          <div className={styles.addLeftBtnWrapper}>
            {leftOptions?.length < 4 && (
              <button
                className={styles.addQuestionBtn}
                onClick={() => handleAddOption("leftOptions")}
              >
                <PlusIcon />
                <span>Add answer option</span>
              </button>
            )}
          </div>
          <div className={styles.addRightBtnWrapper}>
            {rightOptions?.length < 8 && (
              <button
                className={styles.addQuestionBtn}
                onClick={() => handleAddOption("rightOptions")}
              >
                <PlusIcon />
                <span>Add answer option</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {leftOptions.length !== 0 && (
        <div
          className={
            isCorrect
              ? `${styles.correctAnswersWrapper} ${styles.active}`
              : styles.correctAnswersWrapper
          }
        >
          <div
            className={
              leftOptions.find((opt) => opt === "") ||
              rightOptions.find((opt) => opt === "")
                ? `${styles.correctPanelWrapper} ${styles.disabled}`
                : styles.correctPanelWrapper
            }
          >
            <button
              className={styles.label}
              disabled={
                questionAnswers.length !== leftOptions.length ||
                questionAnswers.find((ans) => ans.rightText === "")
              }
              onClick={setCorrect}
            >
              <span className={styles.radioBtn}></span>Correct answer:
            </button>
            <div className={styles.selectsWrapper}>
              {leftOptions.map((opt, index) => (
                <div key={index} className={styles.answer}>
                  <span>{`${index + 1}) = `}</span>
                  <Select
                    bordered={false}
                    allowClear
                    suffixIcon={<ArrowDownIcon className={styles.arrowDown} />}
                    options={getOptions()}
                    onChange={(value) => handleChooseOption(value, opt)}
                    onClear={() => handleClear(opt)}
                    value={questionAnswers.find(({leftText})=>leftText === opt).rightText}
                    disabled={
                      leftOptions.includes("") || rightOptions.includes("")
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.editPanel}>
        {editble ? (
          <>
            <button onClick={handleSubmit}>
              <SubmitIcon />
            </button>
            <button onClick={() => setEditble(false)}>
              <CancelIcon />
            </button>
          </>
        ) : (
          <button onClick={() => setEditble(true)}>
            <EditIcon />
          </button>
        )}

        <button {...dragHandleProps}>
          <DragIcon />
        </button>
        <button onClick={() => handleDeleteQuestion(id)}>
          <DeleteIcon />
        </button>
        <button>{hided ? <DisplayOffIcon /> : <DisplayOnIcon />}</button>
        <button>
          <DetailsIcon />
        </button>
      </div>
      <div className={styles.score}>
        <input
          type="number"
          min={0}
          value={questionScore}
          onChange={handleScoreChange}
        />
        <span>/</span>
        <span>200</span>
      </div>
    </div>
  );
};

export default MatchingTest;
