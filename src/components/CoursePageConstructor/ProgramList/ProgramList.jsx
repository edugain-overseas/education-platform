import React, { useEffect, useState } from "react";
import styles from "./ProgramList.module.scss";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import { ReactComponent as DragIcon } from "../../../images/icons/burger.svg";
import { ReactComponent as SubmitIcon } from "../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../images/icons/cross.svg";
import { ReactComponent as DeleteIcon } from "../../../images/icons/minus.svg";
// import { v4 } from "uuid";

const defaultData = [
  {
    title: "Example title",
    items: [{ text: "example text" }],
  },
];

export default function ProgramList({ listData }) {
  const [data, setData] = useState(defaultData);
  const [edit, setEdit] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setData(listData);
  }, [listData]);

  const handleEdit = (id, value) => {
    setInputValue(value);
    setEdit((prev) => [...prev, id]);
  };

  const handleSubmit = (id) => {
    switch (id.length) {
      case 1: {
        const updatedData = [...data].map((item, index) => {
          if (`${index}` === id) {
            return { ...item, title: inputValue };
          }
          return item;
        });
        setData(updatedData);
        break;
      }
      case 2: {
        const parentToUpdate = data[id[0]];
        parentToUpdate.items[id[1]].text = inputValue;
        const updatedData = [...data];
        updatedData[id[0]] = parentToUpdate;
        setData(updatedData);
        break;
      }
      default:
        return;
    }
    setInputValue("");
    setEdit((prev) => prev.filter((itemId) => itemId !== id));
  };

  return (
    <ul className={styles.programList}>
      {data &&
        data.map((parentItem, index) => {
          const parentId = `${index}`;
          return (
            <li key={parentId} className={styles.programItem}>
              <div className={styles.programItemTitleWrapper}>
                {edit.includes(parentId) ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  <h4>{parentItem.title}</h4>
                )}
                <button className={styles.deleteBtn}>
                  <DeleteIcon />
                </button>
                <button className={styles.dragBtn}>
                  <DragIcon />
                </button>
                {edit.includes(parentId) ? (
                  <>
                    <button
                      className={styles.submitBtn}
                      onClick={() => handleSubmit(parentId)}
                    >
                      <SubmitIcon />
                    </button>
                    <button className={styles.cancelBtn}>
                      <CancelIcon />
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(parentId, parentItem.title)}
                  >
                    <EditIcon />
                  </button>
                )}
              </div>
              {parentItem.items && (
                <ul className={styles.programChildList}>
                  {parentItem.items.map((childItem, index) => {
                    const childId = `${parentId}${index}`;
                    return (
                      <li key={childId} className={styles.programChildItem}>
                        <div className={styles.programChildText}>
                          {edit.includes(childId) ? (
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                            />
                          ) : (
                            <p>{childItem.text}</p>
                          )}
                          <button className={styles.deleteBtn}>
                            <DeleteIcon />
                          </button>
                          <button className={styles.dragBtn}>
                            <DragIcon />
                          </button>
                          {edit.includes(childId) ? (
                            <>
                              <button
                                className={styles.submitBtn}
                                onClick={() => handleSubmit(childId)}
                              >
                                <SubmitIcon />
                              </button>
                              <button className={styles.cancelBtn}>
                                <CancelIcon />
                              </button>
                            </>
                          ) : (
                            <button
                              className={styles.editBtn}
                              onClick={() =>
                                handleEdit(childId, childItem.text)
                              }
                            >
                              <EditIcon />
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
    </ul>
  );
}
