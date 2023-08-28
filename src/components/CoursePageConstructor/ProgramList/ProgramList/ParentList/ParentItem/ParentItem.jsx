import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ReactComponent as EditIcon } from "../../../../../../images/icons/edit.svg";
import { ReactComponent as DragIcon } from "../../../../../../images/icons/burger.svg";
import { ReactComponent as SubmitIcon } from "../../../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../../../images/icons/cross.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../images/icons/minus.svg";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../../../../redux/config/configSelectors";

export default function ParentItem({
  parentItem,
  index,
  styles,
  edit,
  handleEdit,
  findParentValue,
  findChildValue,
  handleParentChange,
  handleChildChange,
  handleSubmit,
  handleCancel,
  handleDelete,
  handleAddItem,
}) {
  const isEdit = useSelector(getIsEdit);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [hoveredChild, setHoveredChild] = useState();

  return (
    <Draggable draggableId={parentItem.id} index={index}>
      {(provided) => (
        <li
          className={
            isEdit
              ? `${styles.programItem} ${styles.itemActive} ${
                  hoveredParent === index ? styles.hoveredParent : ""
                }`
              : styles.programItem
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={styles.programItemTitleWrapper}
            onMouseLeave={() => setHoveredParent(null)}
          >
            <div>
              {edit.includes(parentItem.id) && isEdit ? (
                <input
                  type="text"
                  value={findParentValue(parentItem.id)}
                  onChange={(e) =>
                    handleParentChange(parentItem.id, e.target.value)
                  }
                  onMouseEnter={() => setHoveredParent(index)}
                />
              ) : (
                <h4 onMouseEnter={() => setHoveredParent(index)}>
                  {parentItem.text}
                </h4>
              )}
            </div>
            {isEdit && (
              <button
                className={styles.addItemParentBtn}
                onClick={() => handleAddItem(true, index, index)}
              >
                +
              </button>
            )}
          </div>
          <button
            className={styles.dragBtn}
            {...provided.dragHandleProps}
            style={!isEdit ? { display: "none" } : {}}
          >
            <DragIcon />
          </button>
          {isEdit && (
            <>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(parentItem.id, parentItem.id)}
              >
                <DeleteIcon />
              </button>
              {edit.includes(parentItem.id) ? (
                <>
                  <button
                    className={styles.submitBtn}
                    onClick={() => handleSubmit(parentItem.id, parentItem.id)}
                  >
                    <SubmitIcon />
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => handleCancel(parentItem.id)}
                  >
                    <CancelIcon />
                  </button>
                </>
              ) : (
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(parentItem.id, parentItem.title)}
                >
                  <EditIcon />
                </button>
              )}
            </>
          )}
          {parentItem.items && parentItem.items.length !== 0 && (
            <Droppable
              droppableId={`childList-${parentItem.id}`}
              key={parentItem.id}
              type="child"
            >
              {(provided) => (
                <ul
                  className={styles.programChildList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {parentItem.items.map((childItem, childIndex) => (
                    <Draggable
                      key={childItem.id}
                      draggableId={childItem.id}
                      index={childIndex}
                    >
                      {(provided) => (
                        <li
                          className={
                            isEdit
                              ? `${styles.programChildItem} ${
                                  styles.itemActive
                                } ${
                                  hoveredChild === childIndex
                                    ? styles.hoveredChild
                                    : ""
                                }`
                              : styles.programChildItem
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            className={styles.programChildText}
                            onMouseLeave={() => setHoveredChild(null)}
                          >
                            <div>
                              {edit.includes(childItem.id) && isEdit ? (
                                <input
                                  type="text"
                                  value={findChildValue(
                                    parentItem.id,
                                    childItem.id
                                  )}
                                  onChange={(e) =>
                                    handleChildChange(
                                      parentItem.id,
                                      childItem.id,
                                      e.target.value
                                    )
                                  }
                                  onMouseEnter={() =>
                                    setHoveredChild(childIndex)
                                  }
                                />
                              ) : (
                                <p
                                  onMouseEnter={() =>
                                    setHoveredChild(childIndex)
                                  }
                                >
                                  {childItem.text}
                                </p>
                              )}
                            </div>
                            {isEdit && (
                              <button
                                className={styles.addItemChildBtn}
                                onClick={() =>
                                  handleAddItem(false, childIndex, index)
                                }
                              >
                                +
                              </button>
                            )}
                          </div>
                          <button
                            className={styles.dragBtn}
                            {...provided.dragHandleProps}
                            style={!isEdit ? { display: "none" } : {}}
                          >
                            <DragIcon />
                          </button>
                          {isEdit && (
                            <>
                              <button
                                className={styles.deleteBtn}
                                onClick={() =>
                                  handleDelete(parentItem.id, childItem.id)
                                }
                              >
                                <DeleteIcon />
                              </button>
                              {edit.includes(childItem.id) ? (
                                <>
                                  <button
                                    className={styles.submitBtn}
                                    onClick={() =>
                                      handleSubmit(parentItem.id, childItem.id)
                                    }
                                  >
                                    <SubmitIcon />
                                  </button>
                                  <button
                                    className={styles.cancelBtn}
                                    onClick={() => handleCancel(childItem.id)}
                                  >
                                    <CancelIcon />
                                  </button>
                                </>
                              ) : (
                                <button
                                  className={styles.editBtn}
                                  onClick={() =>
                                    handleEdit(childItem.id, childItem.text)
                                  }
                                >
                                  <EditIcon />
                                </button>
                              )}
                            </>
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </li>
      )}
    </Draggable>
  );
}
