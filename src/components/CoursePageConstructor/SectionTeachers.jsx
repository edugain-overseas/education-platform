import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as DownloadIcon } from "../../images/icons/download.svg";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import { ReactComponent as AddItemIcon } from "../../images/icons/addItem.svg";
import { getIsEdit } from "../../redux/config/configSelectors";
import { useSelector } from "react-redux";
import { serverName } from "../../constants/server";
import IconModal from "../shared/IconModal/IconModal";
import unknownPerson from "../../images/icons/unknownPerson.svg";

const defaultLearnItem = () => ({
  id: v4(),
  image_path: unknownPerson,
  title: "Name",
  text: "Item Text",
});

export default function SectionTeachers({
  styles,
  data,
  setTeachersSectionData,
}) {
  const [teachersTitle, setTeachersTitle] = useState(data.section_title);
  const [teachersText, setTeachersText] = useState(data.section_description);
  const [teachersItems, setTeachersItems] = useState(data.section_items);
  const [showTeachers, setShowTeachers] = useState(data.section_display);
  const [isOpenIconModalId, setIsOpenIconModalId] = useState(null);
  const isEdit = useSelector(getIsEdit);

  useEffect(() => {
    const defaultItem = defaultLearnItem();
    if (!teachersItems.length) {
      setTeachersItems([defaultItem]);
      setTeachersSectionData((prev) => ({
        ...prev,
        section_items: [defaultItem],
      }));
    }
  }, [teachersItems.length, setTeachersSectionData]);

  useEffect(() => {
    setTeachersSectionData((prev) => ({
      ...prev,
      section_display: showTeachers,
    }));
  }, [showTeachers, setTeachersSectionData]);

  const handleTitleChange = (e) => {
    setTeachersTitle(e.target.value);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setTeachersText(e.target.value);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_description: e.target.value,
    }));
  };

  const handleLearnInputChange = (index, name, value) => {
    const updatedItems = [...teachersItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    teachersItems(updatedItems);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_items: updatedItems,
    }));
  };

  const handleAddLearnItem = (index) => {
    const updatedItems = [...teachersItems];
    updatedItems.splice(index + 1, 0, defaultLearnItem());

    setTeachersItems(updatedItems);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_items: updatedItems,
    }));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...teachersItems];
    updatedItems.splice(index, 1);

    setTeachersItems(updatedItems);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_items: updatedItems,
    }));
  };

  const handleDisplayClick = () => {
    setShowTeachers((prev) => !prev);
  };

  const setNewIcon = (id, iconPath) => {
    const updatedItems = [...teachersItems].map((item) => {
      if (item.id === id) {
        return { ...item, image_path: iconPath };
      }
      return { ...item };
    });
    setTeachersItems(updatedItems);
    setTeachersSectionData((prev) => ({
      ...prev,
      section_items: updatedItems,
    }));
    setIsOpenIconModalId(null);
  };

  return (
    <section className={styles.toLearn}>
      <div
        className={styles.container}
        style={{ display: showTeachers ? "block" : "none" }}
      >
        <div className={styles.toLearnTitleWrapper}>
          {isEdit ? (
            <input
              type="text"
              onChange={handleTitleChange}
              value={teachersTitle}
            />
          ) : (
            <h2>{teachersTitle}</h2>
          )}
        </div>
        <div className={styles.toLearnDescWrapper}>
          {isEdit ? (
            <textarea
              type="text"
              value={teachersText}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p className={styles.toLearnDesc}>{teachersText}</p>
          )}
        </div>
        <ul className={styles.toLearnCardList}>
          {teachersItems.length &&
            teachersItems.map((item, index) => (
              <li key={index} className={isEdit ? `${styles.itemEdit} ${styles.teacherItem}` : styles.teacherItem}>
                <div className={styles.cardWrapper}>
                  <div className={styles.toLearnIconWrapper}>
                    <img
                      src={
                        item.image_path === unknownPerson
                          ? unknownPerson
                          : `${serverName}${item.image_path}`
                      }
                      alt="icon"
                    />
                    {isEdit && (
                      <>
                        <button
                          className={styles.uploadIconBtn}
                          onClick={() => setIsOpenIconModalId(item.id)}
                        >
                          <DownloadIcon />
                        </button>
                        {isOpenIconModalId === item.id && (
                          <IconModal
                            itemId={item.id}
                            isOpen={isOpenIconModalId === item.id}
                            closeModal={() => {
                              setIsOpenIconModalId(null);
                            }}
                            setNewIcon={setNewIcon}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.toLearnCardTitleWrapper}>
                    {isEdit ? (
                      <input
                        type="text"
                        value={item.title}
                        name="title"
                        onChange={(e) =>
                          handleLearnInputChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <h3>{item.title}</h3>
                    )}
                  </div>
                  <div className={styles.toLearnTextWrapper}>
                    {isEdit ? (
                      <textarea
                        name="text"
                        value={item.text}
                        onChange={(e) =>
                          handleLearnInputChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p>{item.text}</p>
                    )}
                  </div>
                  {isEdit && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteItem(index)}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                {teachersItems.length <= 2 &&
                  index !== teachersItems.length &&
                  isEdit && (
                    <button
                      className={styles.addItemBtn}
                      onClick={() => handleAddLearnItem(index)}
                    >
                      <AddItemIcon />
                    </button>
                  )}
              </li>
            ))}
        </ul>
      </div>
      {isEdit && (
        <button className={styles.displayBtn}>
          <DisplayOffIcon onClick={handleDisplayClick} />
        </button>
      )}
    </section>
  );
}
