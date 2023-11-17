import React, { useEffect, useState } from "react";
import InstructionsList from "./InstructionsList/InstructionsList";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getIsEdit } from "../../../../../redux/config/configSelectors";
import { ReactComponent as PlusIcon } from "../../../../../images/icons/plus.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../../../../images/icons/editBlack.svg";
import { ReactComponent as DragIcon } from "../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../images/icons/minus.svg";
import { ReactComponent as DisplayOffIcon } from "../../../../../images/icons/displayOff.svg";
import { ReactComponent as DisplayOnIcon } from "../../../../../images/icons/displayOn.svg";
import { ReactComponent as SubmitIcon } from "../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../images/icons/cross.svg";
import styles from "./InstructionsCategoriesList.module.scss";
import { useDispatch } from "react-redux";
import {
  createSubjectInstructionCategoryThunk,
  deleteInstructionCategoryThunk,
  updateSubjectInstructionCategoryThunk,
} from "../../../../../redux/subject/subjectOperations";
import { useParams } from "react-router";

const newCategoryDefault = {
  category_name: "",
  number: 0,
  is_view: true,
};

const InstructionsCategoriesList = ({ data }) => {
  const [newCategory, setNewCategory] = useState(null);
  const [editTitleId, setEditTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [categoriesData, setCategoriesData] = useState(
    [...data].sort((itemA, itemB) => itemA.number - itemB.number)
  );
  const [dragging, setDragging] = useState(false);

  const isEdit = useSelector(getIsEdit);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    setNewCategory(newCategoryDefault);
  };

  const setEditCategory = (data) => {
    console.log(data);
    setEditTitleId(data.categoryId);
    setNewTitle(data.category);
  };

  const handleUpdateCategoryTitle = () => {
    if (newTitle !== "") {
      dispatch(
        updateSubjectInstructionCategoryThunk({
          categoryId: editTitleId,
          credentials: { category_name: newTitle },
        })
      ).then(() => {
        setEditTitleId(null);
        setNewTitle("");
      });
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (editTitleId === "new") {
      const updatedState = {
        ...newCategory,
        category_name: value,
      };
      setNewCategory(updatedState);
      return;
    }
    setNewTitle(value);
  };

  const handleSumbitCategory = () => {
    console.log(newCategory);
    if (newCategory.category_name !== "") {
      dispatch(
        createSubjectInstructionCategoryThunk({
          ...newCategory,
          number: data.length + 1,
          subject_id: id,
        })
      ).then(() => {
        setNewCategory(null);
        setEditTitleId(null);
      });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteInstructionCategoryThunk({ subjectId: +id, categoryId }));
  };

  const handleChangeCategoryDisplay = (categoryId, isView) => {
    dispatch(
      updateSubjectInstructionCategoryThunk({
        categoryId,
        credentials: { is_view: !isView },
      })
    );
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    setCategoriesData((prev) => {
      const updatedState = [...prev];
      const [removed] = updatedState.splice(source.index, 1);
      updatedState.splice(destination.index, 0, removed);

      updatedState.forEach(({ categoryId }, index) => {
        dispatch(
          updateSubjectInstructionCategoryThunk({
            categoryId,
            credentials: { number: index + 1 },
          })
        );
      });

      return updatedState;
    });
  };

  useEffect(() => {
    setCategoriesData(
      [...data].sort((itemA, itemB) => itemA.number - itemB.number)
    );
  }, [data]);

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={() => setDragging(true)}
    >
      <Droppable droppableId="categories" direction="vertical">
        {(provided) => (
          <ul
            className={styles.categoriesList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {categoriesData.map((data, index) => (
              <Draggable
                key={data.categoryId}
                draggableId={`${data.categoryId}`}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={
                      !isEdit && !data.categoryIsView ? styles.displayOff : null
                    }
                  >
                    {editTitleId && editTitleId === data.categoryId ? (
                      <input onChange={handleTitleChange} value={newTitle} />
                    ) : (
                      <h3>{data.category}</h3>
                    )}
                    <InstructionsList
                      data={data.instructions}
                      categoryId={data.categoryId}
                      subjectId={+id}
                    />
                    {isEdit ? (
                      <>
                        <div className={styles.editPanel}>
                          <button {...provided.dragHandleProps}>
                            <DragIcon />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCategory(data.categoryId)
                            }
                          >
                            <DeleteIcon />
                          </button>
                          <button
                            onClick={() =>
                              handleChangeCategoryDisplay(
                                data.categoryId,
                                data.categoryIsView
                              )
                            }
                          >
                            {data.categoryIsView ? (
                              <DisplayOnIcon />
                            ) : (
                              <DisplayOffIcon />
                            )}
                          </button>
                        </div>
                        <div className={styles.detailPanel}>
                          <div>
                            {editTitleId && editTitleId === data.categoryId ? (
                              <>
                                <button onClick={handleUpdateCategoryTitle}>
                                  <SubmitIcon />
                                </button>
                                <button onClick={() => setEditTitleId(null)}>
                                  <CancelIcon />
                                </button>
                              </>
                            ) : (
                              <button onClick={() => setEditCategory(data)}>
                                <EditIcon />
                              </button>
                            )}
                          </div>
                          <button>
                            <DetailsIcon />
                          </button>
                        </div>
                      </>
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
            {newCategory && !dragging && (
              <li>
                {editTitleId && editTitleId === "new" ? (
                  <input
                    onChange={handleTitleChange}
                    value={newCategory.category_name}
                    autoFocus
                  />
                ) : (
                  <h3>{newCategory.category_name}</h3>
                )}
                {isEdit && (
                  <>
                    <div className={styles.editPanel}>
                      <button>
                        <DragIcon />
                      </button>
                      <button>
                        <DeleteIcon />
                      </button>
                      <button>
                        <DisplayOffIcon />
                      </button>
                    </div>
                    <div className={styles.detailPanel}>
                      <div>
                        {editTitleId && editTitleId === "new" ? (
                          <>
                            <button onClick={handleSumbitCategory}>
                              <SubmitIcon />
                            </button>
                            <button onClick={() => setEditTitleId(null)}>
                              <CancelIcon />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setEditTitleId("new")}>
                            <EditIcon />
                          </button>
                        )}
                      </div>
                      <button>
                        <DetailsIcon />
                      </button>
                    </div>
                  </>
                )}
              </li>
            )}
            {isEdit && !dragging && (
              <li className={styles.addItem}>
                <button
                  className={styles.addCategoryBtn}
                  onClick={handleAddCategory}
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

export default InstructionsCategoriesList;
