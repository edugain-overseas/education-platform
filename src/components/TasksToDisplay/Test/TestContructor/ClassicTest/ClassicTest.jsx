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
import styles from "./ClassicTest.module.scss";

const defaultAnswer = {
  isCorrect: false,
  answerText: "",
};

const ClassicTest = ({ part, setParts, handleSubmitChanges, dragHandleProps, handleDeleteQuestion }) => {
  const [editble, setEditble] = useState(false);
  const {
    questionText,
    questionAnswers,
    questionScore,
    hided,
    questionNumber,
    questionId,
    id
  } = part;

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

  const handleAnswerChange = (e, i) => {
    const value = e.target.value;
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionAnswers: item.questionAnswers.map((answer, index) => {
              if (index === i) {
                return {
                  ...answer,
                  answerText: value,
                };
              }
              return answer;
            }),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleAddAnswer = () => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionAnswers: [...item.questionAnswers, defaultAnswer],
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleChooseCorrectAnswer = (index) => {
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionAnswers: item.questionAnswers.map((answer, i) => {
              if (index === i) {
                return {
                  ...answer,
                  isCorrect: true,
                };
              }
              return { ...answer, isCorrect: false };
            }),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleDeleteAnswer = (index) => {
    console.log(index);
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            questionAnswers: item.questionAnswers.filter((_, i) => i !== index),
          };
        }
        return item;
      });
      return updatedState;
    });
  };

  const handleDragEnd = ({ source, destination }) => {
    const { index: startIndex } = source;
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
          const updatedAnswers = [...item.questionAnswers];
          const [removed] = updatedAnswers.splice(startIndex, 1);
          updatedAnswers.splice(endIndex, 0, removed);
          return { ...item, questionAnswers: updatedAnswers };
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="answers">
            {(provided, { isDraggingOver }) => (
              <div
                className={styles.inputsWrapper}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  height: isDraggingOver
                    ? `${
                        questionAnswers.length * 32 +
                        (questionAnswers.length - 1) * 16
                      }rem`
                    : "auto",
                }}
              >
                {questionAnswers.map(({ answerText, isCorrect }, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided) => (
                      <div
                        className={styles.answerWrapper}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <input
                          type="text"
                          value={answerText}
                          onChange={(e) => handleAnswerChange(e, index)}
                          placeholder="Please write your possible answer here..."
                        />
                        <button
                          className={
                            isCorrect
                              ? `${styles.correntBtn} ${styles.correct}`
                              : styles.correntBtn
                          }
                          onClick={() => handleChooseCorrectAnswer(index)}
                        >
                          <span className={styles.radioBtn}></span>
                          <span className={styles.correctBtnText}>
                            Correct answer
                          </span>
                        </button>
                        <div className={styles.subPanelWrapper}>
                          <button {...provided.dragHandleProps}>
                            <DragIcon />
                          </button>
                          <button onClick={() => handleDeleteAnswer(index)}>
                            <DeleteIcon />
                          </button>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {questionAnswers.length < 4 && (
          <button className={styles.addQuestionBtn} onClick={handleAddAnswer}>
            <PlusIcon />
            <span>Add answer option</span>
          </button>
        )}
      </div>
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
        <button onClick={()=>handleDeleteQuestion(id)}>
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
          max={200}
          value={questionScore}
          onChange={handleScoreChange}
        />
        <span>/</span>
        <span>200</span>
      </div>
    </div>
  );
};

export default ClassicTest;
