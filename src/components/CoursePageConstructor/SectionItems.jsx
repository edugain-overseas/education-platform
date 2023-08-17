import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as DownloadIcon } from "../../images/icons/download.svg";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import { ReactComponent as AddItemIcon } from "../../images/icons/addItem.svg";
import pointIcon from "../../images/icons/pointIcon.png";

const defaultLearnItem = {
  id: v4(),
  imagePath: pointIcon,
  title: "Item title",
  text: "Item Text",
};

export default function SectionItems({ styles, data, setItemsSectionData }) {
  const [toLearnTitle, setToLearnTitle] = useState(data.section_title);
  const [toLearnText, setToLearnText] = useState(data.section_description);
  const [toLearnItems, setLearnItems] = useState(data.section_items);
  const [showToLearn, setShowToLearn] = useState(data.section_display || true);

  useEffect(() => {
    if (!toLearnItems.length) {
      setLearnItems([defaultLearnItem]);
      setItemsSectionData((prev) => ({
        ...prev,
        section_items: [defaultLearnItem],
      }));
    }
  }, [toLearnItems.length, setItemsSectionData]);

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
    setShowToLearn((prev)=>!prev)
  }

  return (
    <section className={styles.toLearn}>
      <div
        className={styles.container}
        style={{ display: showToLearn ? "block" : "none" }}
      >
        <div className={styles.toLearnTitleWrapper}>
          <h2>{toLearnTitle}</h2>
          <input
            type="text"
            onChange={handleTitleChange}
            value={toLearnTitle}
          />
        </div>
        <div className={styles.toLearnDescWrapper}>
          <p className={styles.toLearnDesc}>{toLearnText}</p>
          <textarea
            type="text"
            rows={2}
            value={toLearnText}
            onChange={handleDescriptionChange}
          />
        </div>
        <ul className={styles.toLearnCardList}>
          {toLearnItems.length &&
            toLearnItems.map((item, index) => (
              <li key={index}>
                <div className={styles.cardWrapper}>
                  <div className={styles.toLearnIconWrapper}>
                    <img src={item.imagePath} alt="point icon" />
                    <button className={styles.uploadIconBtn}>
                      <DownloadIcon />
                    </button>
                  </div>
                  <div className={styles.toLearnCardTitleWrapper}>
                    <h3>{item.title}</h3>
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
                  </div>
                  <div className={styles.toLearnTextWrapper}>
                    <p>{item.text}</p>
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
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteItem(index)}
                  >
                    <TrashIcon />
                  </button>
                </div>
                {toLearnItems.length <= 4 && index !== toLearnItems.length && (
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
      <button className={styles.displayBtn}>
        <DisplayOffIcon onClick={handleDisplayClick} />
      </button>
    </section>
  );
}
