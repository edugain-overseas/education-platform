import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { navLinkActiveHandler } from "../../../../../../helpers/navLinkActiveHandler";
import { getIsEdit } from "../../../../../../redux/config/configSelectors";
import { ReactComponent as ArchiveIcon } from "../../../../../../images/icons/archive.svg";
import { ReactComponent as PlusIcon } from "../../../../../../images/icons/plus.svg";
import { ReactComponent as SubmitIcon } from "../../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../../images/icons/cross.svg";
import { ReactComponent as DetailsIcon } from "../../../../../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../../../../../images/icons/editBlack.svg";
import { ReactComponent as DragIcon } from "../../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../images/icons/minus.svg";
import { ReactComponent as DisplayOffIcon } from "../../../../../../images/icons/displayOff.svg";
import { ReactComponent as DisplayOnIcon } from "../../../../../../images/icons/displayOn.svg";
import { useDispatch } from "react-redux";
import {
  createSubjectInstructionThunk,
  deleteInstructionThunk,
  updateSubjectInstructionThunk,
} from "../../../../../../redux/subject/subjectOperations";
import styles from "./InstructionsList.module.scss";

const defaultInstruction = {
  // subject_id: 0,
  title: "",
  text: "",
  subtitle: "",
  // subject_category_id: 0,
  is_view: true,
};

const InstructionsList = ({ data, categoryId, subjectId }) => {
  const [newInstruction, setNewInstruction] = useState(null);
  const [changingTitleId, setChangingTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [instructionsData, setInstructionsData] = useState(
    [...data].sort((itemA, itemB) => itemA.number - itemB.number)
  );

  const isEdit = useSelector(getIsEdit);
  const dispatch = useDispatch();
  console.log(instructionsData);

  const handleAddInstruction = () => {
    setNewInstruction({
      ...defaultInstruction,
      subject_id: subjectId,
      subject_category_id: categoryId,
      number: data.length + 1,
    });
  };

  const handleNewInstructionTitleChange = (e) => {
    const value = e.target.value;
    setNewInstruction((prev) => ({ ...prev, title: value }));
  };

  const handleSumbitInstruction = () => {
    if (newInstruction.title === "") {
      return;
    }
    dispatch(createSubjectInstructionThunk(newInstruction)).then(() =>
      setNewInstruction(null)
    );
    console.log(newInstruction);
  };

  const handleUpdateInstructionTitle = (instrId) => {
    if (newTitle === "") {
      return;
    }
    dispatch(
      updateSubjectInstructionThunk({
        instrId,
        updatedData: { title: newTitle },
      })
    ).then(() => {
      setNewTitle("");
      setChangingTitleId(null);
    });
    console.log(newTitle, instrId);
  };

  const handleDeleteInstruction = (instructionId) => {
    dispatch(deleteInstructionThunk({ instructionId, subjectId }));
  };

  const handleChangeInstructionDisplay = (instrId, isView) => {
    dispatch(
      updateSubjectInstructionThunk({
        instrId,
        updatedData: { is_view: !isView },
      })
    );
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    setInstructionsData((prev) => {
      const updatedState = [...prev];
      const [removed] = updatedState.splice(source.index, 1);
      updatedState.splice(destination.index, 0, removed);

      updatedState.forEach(({ instructionId }, index) => {
        dispatch(
          updateSubjectInstructionThunk({
            instrId: instructionId,
            updatedData: { number: index + 1 },
          })
        );
      });

      return updatedState;
    });
  };

  useEffect(() => {
    setInstructionsData(
      [...data].sort((itemA, itemB) => itemA.number - itemB.number)
    );
  }, [data]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="instruction">
        {(provided) => (
          <ul
            className={styles.instructionsList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {instructionsData.map(({ instructionId, title, isView }, index) => (
              <Draggable
                key={instructionId}
                draggableId={`${instructionId}`}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={
                      !isView && !isEdit ? `${styles.displayOff}` : null
                    }
                  >
                    <NavLink
                      to={`${instructionId}`}
                      className={({ isActive }) =>
                        navLinkActiveHandler(isActive, styles)
                      }
                    >
                      <ArchiveIcon />
                      {isEdit && changingTitleId === instructionId ? (
                        <input
                          type="text"
                          autoFocus
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      ) : (
                        <h4
                          title={title}
                          className={isEdit ? styles.shortTitle : null}
                        >
                          {title}
                        </h4>
                      )}
                    </NavLink>
                    {isEdit ? (
                      <div className={styles.editBtnsWrapper}>
                        {changingTitleId === instructionId ? (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateInstructionTitle(instructionId)
                              }
                            >
                              <SubmitIcon />
                            </button>
                            <button
                              onClick={() => {
                                setChangingTitleId(null);
                                setNewTitle("");
                              }}
                            >
                              <CancelIcon />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setChangingTitleId(instructionId);
                              setNewTitle(title);
                            }}
                          >
                            <EditIcon />
                          </button>
                        )}
                        <button {...provided.dragHandleProps}>
                          <DragIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteInstruction(instructionId)}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          onClick={() =>
                            handleChangeInstructionDisplay(
                              instructionId,
                              isView
                            )
                          }
                        >
                          {!isView ? <DisplayOffIcon /> : <DisplayOnIcon />}
                        </button>
                        <button>
                          <DetailsIcon />
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{ display: "none" }}
                        {...provided.dragHandleProps}
                      ></span>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {newInstruction && isEdit && (
              <li className={styles.newInstruction}>
                <input
                  type="text"
                  autoFocus
                  value={newInstruction.title}
                  onChange={handleNewInstructionTitleChange}
                  placeholder="Please write title fot instruction here..."
                />
                <button onClick={handleSumbitInstruction}>
                  <SubmitIcon />
                </button>
                <button onClick={() => setNewInstruction(null)}>
                  <CancelIcon />
                </button>
              </li>
            )}
            {isEdit && !newInstruction && (
              <li className={styles.addItem}>
                <button
                  className={styles.addCategoryBtn}
                  onClick={handleAddInstruction}
                >
                  <PlusIcon />
                </button>
              </li>
            )}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default InstructionsList;
