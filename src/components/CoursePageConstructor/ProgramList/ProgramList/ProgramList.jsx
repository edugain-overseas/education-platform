import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./ProgramList.module.scss";
import ParentItem from "./ParentList/ParentItem/ParentItem";
import { useSelector } from "react-redux";
import { getSubjectAbout } from "../../../../redux/subject/subjectSelectors";

const defaultData = [
  {
    id: v4(),
    title: "Example title",
    items: [{ id: v4(), text: "example text" }],
  },
];

export default function ProgramList() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const listData = useSelector(getSubjectAbout);

  useEffect(() => {
    setData(listData);
    setInputValues(listData);
  }, [listData]);

  const handleEdit = (id) => {
    setEdit((prev) => [...prev, id]);
  };

  const findParentValue = (id) =>
    inputValues.find((item) => item.id === id).text;

  const findChildValue = (parentId, childId) =>
    inputValues
      .find((parent) => parent.id === parentId)
      .items.find((child) => child.id === childId).text;

  const handleParentChange = (id, value) => {
    console.log(inputValues);
    const updatedInputValues = inputValues.map((item) =>
      item.id === id ? { ...item, text: value } : item
    );
    setInputValues(updatedInputValues);
  };

  const handleChildChange = (parentId, id, value) => {
    const updatedInputValues = inputValues.map((parent) =>
      parent.id === parentId
        ? {
            ...parent,
            items: parent.items.map((child) =>
              child.id === id ? { ...child, text: value } : child
            ),
          }
        : parent
    );
    setInputValues(updatedInputValues);
  };

  const handleSubmit = (parentId, id) => {
    if (parentId === id) {
      const updatedData = [...data].map((item) =>
        item.id === id
          ? { ...item, text: inputValues.find((item) => item.id === id).text }
          : item
      );

      setData(updatedData);
    } else {
      const value = inputValues
        .find((parent) => parent.id === parentId)
        .items.find((child) => child.id === id).text;
      const updatedData = [...data].map((parent) =>
        parent.id === parentId
          ? {
              ...parent,
              items: parent.items.map((child) =>
                child.id === id ? { ...child, text: value } : child
              ),
            }
          : parent
      );

      setData(updatedData);
    }

    setEdit((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleCancel = (id) => {
    const updatedEdit = [...edit].filter((itemId) => itemId !== id);
    setEdit(updatedEdit);
  };

  const handleDelete = (parentId, id) => {
    console.log("parentId", parentId, "/n", "id", id);
    if (parentId === id) {
      const updatedData = [...data].filter((parent) => parent.id !== id);
      setData(updatedData);
      setInputValues(updatedData);
    } else {
      const updatedData = [...data].map((parent) =>
        parent.id === parentId
          ? {
              ...parent,
              items: parent.items.filter((child) => child.id !== id),
            }
          : parent
      );
      console.log(updatedData);
      setData(updatedData);
      setInputValues(updatedData);
    }
  };

  const handleDragEnd = ({ destination, source, draggableId, type }) => {
    console.log(destination, source, draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'parent') {
      const updatedData = [...data]
      const draggable = updatedData.find(item=>item.id === draggableId)

      updatedData.splice(source.index, 1)
      updatedData.splice(destination.index, 0, draggable)
      
      setData(updatedData)
      setInputValues(updatedData)
      return
    }

    const draggableItem = [...data]
      .find((parent) => `childList-${parent.id}` === source.droppableId)
      .items.find((child) => child.id === draggableId);

    const withoutDraggable = [...data].map((parent) =>
    `childList-${parent.id}` === source.droppableId
        ? {
            ...parent,
            items: parent.items.filter((child) => child.id !== draggableId),
          }
        : parent
    );

    const updatedData = withoutDraggable.map((parent) => {
      if (`childList-${parent.id}` === destination.droppableId) {
        const itemsCopy = [...parent.items];
        itemsCopy.splice(destination.index, 0, draggableItem);
        return { ...parent, items: itemsCopy };
      }
      return parent;
    });
    setData(updatedData);
    setInputValues(updatedData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="programList" type="parent">
        {(provided) => (
          <ul
            className={styles.programList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data &&
              data.map((parentItem, index) => (
                <ParentItem
                  parentItem={parentItem}
                  index={index}
                  styles={styles}
                  edit={edit}
                  handleEdit={handleEdit}
                  findParentValue={findParentValue}
                  findChildValue={findChildValue}
                  handleParentChange={handleParentChange}
                  handleChildChange={handleChildChange}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                  handleDelete={handleDelete}
                  key={parentItem.id}
                />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
