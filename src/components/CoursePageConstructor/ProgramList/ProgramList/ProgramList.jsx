import React, { useState } from "react";
import { v4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./ProgramList.module.scss";
import ParentItem from "./ParentList/ParentItem/ParentItem";

const defaultParentItem = () => ({
  id: v4(),
  text: "Example title",
  items: [{ id: v4(), text: "example text" }],
});

const defaultChildItem = () => ({
  id: v4(),
  text: "example text",
});

export default function ProgramList({ listData, setProgramSectionData }) {
  const [data, setData] = useState(listData || []);
  const [inputValues, setInputValues] = useState(listData || []);
  const [edit, setEdit] = useState([]);

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
      setProgramSectionData((prev) => ({
        ...prev,
        section_items: updatedData,
      }));
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
      setProgramSectionData((prev) => ({
        ...prev,
        section_items: updatedData,
      }));
    }

    setEdit((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleCancel = (id) => {
    const updatedEdit = [...edit].filter((itemId) => itemId !== id);
    setEdit(updatedEdit);
  };

  const handleDelete = (parentId, id) => {
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
      setData(updatedData);
      setInputValues(updatedData);
      setProgramSectionData((prev) => ({
        ...prev,
        section_items: updatedData,
      }));
    }
  };

  const handleDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "parent") {
      const updatedData = [...data];
      const draggable = updatedData.find((item) => item.id === draggableId);

      updatedData.splice(source.index, 1);
      updatedData.splice(destination.index, 0, draggable);

      setData(updatedData);
      setInputValues(updatedData);
      setProgramSectionData((prev) => ({
        ...prev,
        section_items: updatedData,
      }));
      return;
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
    setProgramSectionData((prev) => ({
      ...prev,
      section_items: updatedData,
    }));
  };

  const handleAddItem = (parent, index, parentIndex) => {
    let updatedData = [...data];
    if (parent) {
      updatedData.splice(index + 1, 0, defaultParentItem());
    } else {
      const parentItem = updatedData[parentIndex];
      const updatedItems = [...parentItem.items];
      updatedItems.splice(index + 1, 0, defaultChildItem());
      updatedData[parentIndex] = { ...parentItem, items: updatedItems };
    }
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
                  handleAddItem={handleAddItem}
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
