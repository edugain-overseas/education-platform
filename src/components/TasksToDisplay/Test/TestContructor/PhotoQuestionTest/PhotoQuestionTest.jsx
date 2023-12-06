import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image } from "antd";
import { ReactComponent as DragIcon } from "../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../../../images/icons/plusRounded.svg";
import { ReactComponent as EditIcon } from "../../../../../images/icons/editBlack.svg";
import { ReactComponent as SubmitIcon } from "../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../images/icons/cross.svg";
import { ReactComponent as DisplayOnIcon } from "../../../../../images/icons/displayOn.svg";
import { ReactComponent as DisplayOffIcon } from "../../../../../images/icons/displayOff.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as TrashIcon } from "../../../../../images/icons/trashRounded.svg";
import { ReactComponent as NoImageIcon } from "../../../../../images/icons/noImage.svg";
import fallback from "../../../../../images/noImage.jpeg";
import { serverName } from "../../../../../constants/server";
import { uploadTestImage } from "../../../../../services/taskServices";
import styles from "./PhotoQuestionTest.module.scss";

const defaultAnswer = {
  isCorrect: false,
  answerText: "",
};

const PhotoQuestionTest = ({ part, setParts, handleSubmitChanges, dragHandleProps, handleDeleteQuestion }) => {
  const [editble, setEditble] = useState(false);
  const inputRef = useRef();
  console.log(part);
  const {
    questionText,
    questionAnswers,
    questionScore,
    hided,
    questionNumber,
    imagePath,
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

  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await uploadTestImage(formData);
      setParts((prev) => {
        const updatedState = prev.map((item) => {
          if (item.id === part.id) {
            return {
              ...item,
              imagePath: response.filePath,
            };
          }
          return item;
        });
        return updatedState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = () => {
    console.log("remove");
    setParts((prev) => {
      const updatedState = prev.map((item) => {
        if (item.id === part.id) {
          return {
            ...item,
            imagePath: "",
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
      <div className={styles.questionInputWrapper}>
        <span>Question:</span>
        <div className={styles.questionInputSubWrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              {imagePath === "" ? (
                <button onClick={() => inputRef.current.click()}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleUploadImage}
                    style={{ display: "none" }}
                  />
                  <NoImageIcon />
                </button>
              ) : (
                <Image src={`${serverName}${imagePath}`} fallback={fallback} />
              )}
            </div>
            {imagePath !== "" && (
              <button className={styles.deleteBtn} onClick={removeImage}>
                <TrashIcon />
              </button>
            )}
          </div>
          <input
            type="text"
            value={questionText}
            onChange={(e) => handleQuestionChange(e)}
            placeholder="Please write your question here..."
          />
        </div>
      </div>
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
                {questionAnswers.map(
                  ({ answerText, isCorrect, imagePath }, index) => (
                    <Draggable
                      key={index}
                      draggableId={`${index}`}
                      index={index}
                    >
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
                  )
                )}
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
          value={questionScore}
          onChange={handleScoreChange}
        />
        <span>/</span>
        <span>200</span>
      </div>
    </div>
  );
};

export default PhotoQuestionTest;
