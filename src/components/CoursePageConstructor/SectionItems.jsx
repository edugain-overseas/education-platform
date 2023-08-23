import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as DownloadIcon } from "../../images/icons/download.svg";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import { ReactComponent as AddItemIcon } from "../../images/icons/addItem.svg";
import pointIcon from "../../images/icons/pointIcon.png";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../redux/config/configSelectors";

const defaultLearnItem = {
  id: v4(),
  image_path: pointIcon,
  title: "Item title",
  text: "Item Text",
};

export default function SectionItems({ styles, data, setItemsSectionData }) {
  const [toLearnTitle, setToLearnTitle] = useState(data.section_title);
  const [toLearnText, setToLearnText] = useState(data.section_description);
  const [toLearnItems, setLearnItems] = useState(data.section_items);
  const [showToLearn, setShowToLearn] = useState(data.section_display);
  const isEdit = useSelector(getIsEdit);

  useEffect(() => {
    if (!toLearnItems.length) {
      setLearnItems([defaultLearnItem]);
      setItemsSectionData((prev) => ({
        ...prev,
        section_items: [defaultLearnItem],
      }));
    }
  }, [toLearnItems.length, setItemsSectionData]);

  useEffect(() => {
    setItemsSectionData((prev) => ({ ...prev, section_display: showToLearn }));
  }, [showToLearn, setItemsSectionData]);

  const handleTitleChange = (e) => {
    setToLearnTitle(e.target.value);
    setItemsSectionData((prev) => ({ ...prev, section_title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setToLearnText(e.target.value);
    setItemsSectionData((prev) => ({
      ...prev,
      section_description: e.target.value,
    }));
  };

  const handleLearnInputChange = (index, name, value) => {
    const updatedItems = [...toLearnItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    setLearnItems(updatedItems);
    setItemsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  const handleAddLearnItem = (index) => {
    const updatedItems = [...toLearnItems];
    updatedItems.splice(index + 1, 0, defaultLearnItem);

    setLearnItems(updatedItems);
    setItemsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...toLearnItems];
    updatedItems.splice(index, 1);

    setLearnItems(updatedItems);
    setItemsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  const handleDisplayClick = () => {
    setShowToLearn((prev) => !prev);
  };

  return (
    <section className={styles.toLearn}>
      <div
        className={styles.container}
        style={{ display: showToLearn ? "block" : "none" }}
      >
        <div className={styles.toLearnTitleWrapper}>
          {isEdit ? (
            <input
              type="text"
              onChange={handleTitleChange}
              value={toLearnTitle}
            />
          ) : (
            <h2>{toLearnTitle}</h2>
          )}
        </div>
        <div className={styles.toLearnDescWrapper}>
          {isEdit ? (
            <textarea
              type="text"
              value={toLearnText}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p className={styles.toLearnDesc}>{toLearnText}</p>
          )}
        </div>
        <ul className={styles.toLearnCardList}>
          {toLearnItems.length &&
            toLearnItems.map((item, index) => (
              <li key={index} className={isEdit ? styles.itemEdit : null}>
                <div className={styles.cardWrapper}>
                  <div className={styles.toLearnIconWrapper}>
                    <img src={item.image_path} alt="icon" />
                    {isEdit && (
                      <button className={styles.uploadIconBtn}>
                        <DownloadIcon />
                      </button>
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
                {toLearnItems.length <= 4 &&
                  index !== toLearnItems.length &&
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
