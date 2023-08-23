import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as DownloadIcon } from "../../images/icons/download.svg";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import { ReactComponent as AddItemIcon } from "../../images/icons/addItem.svg";
import MonitorIcon from "../../images/icons/monitor.svg";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../redux/config/configSelectors";
// import { ReactComponent as MonitorIcon } from "../../images/icons/monitor.svg";
// import { ReactComponent as DiplomaIcon } from "../../images/icons/diploma.svg";
// import { ReactComponent as KnowledgeIcon } from "../../images/icons/knowledge.svg";

const defaultStepsItem = {
  id: v4(),
  image_path: MonitorIcon,
  title: "Item title",
  text: "Item Text",
};

export default function SectionSteps({ styles, data, setStepsSectionData }) {
  const [stepsTitle, setStepsTitle] = useState(data.section_title);
  const [stepsDescription, setStepsDescription] = useState(
    data.section_description
  );
  const [stepsItems, setStepItems] = useState(data.section_items);
  const [showSteps, setShowSteps] = useState(data.section_display);
  const isEdit = useSelector(getIsEdit);

  useEffect(() => {
    if (!stepsItems.length) {
      setStepItems([defaultStepsItem]);
      setStepsSectionData((prev) => ({
        ...prev,
        section_items: [defaultStepsItem],
      }));
    }
  }, [stepsItems.length, setStepsSectionData]);

  useEffect(() => {
    setStepsSectionData((prev) => ({ ...prev, section_display: showSteps }));
  }, [showSteps, setStepsSectionData]);

  const handleTitleChange = (e) => {
    setStepsTitle(e.target.value);
    setStepsSectionData((prev) => ({ ...prev, section_title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setStepsDescription(e.target.value);
    setStepsSectionData((prev) => ({
      ...prev,
      section_description: e.target.value,
    }));
  };

  const handleLearnInputChange = (index, name, value) => {
    const updatedItems = [...stepsItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    setStepItems(updatedItems);
    setStepsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  const handleAddLearnItem = () => {
    const updatedItems = [...stepsItems, defaultStepsItem];
    setStepItems(updatedItems);
    setStepsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...stepsItems];
    updatedItems.splice(index, 1);

    setStepItems(updatedItems);
    setStepsSectionData((prev) => ({ ...prev, section_items: updatedItems }));
  };

  return (
    <section className={styles.toLearnSteps}>
      <div
        className={styles.container}
        style={{ display: showSteps ? "block" : "none" }}
      >
        <div className={styles.toLearnTitleWrapper}>
          {isEdit ? (
            <input
              type="text"
              onChange={handleTitleChange}
              value={stepsTitle}
            />
          ) : (
            <h2>{stepsTitle}</h2>
          )}
        </div>
        <div className={styles.toLearnDescWrapper}>
          {isEdit ? (
            <textarea
              type="text"
              value={stepsDescription}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p className={styles.toLearnDesc}>{stepsDescription}</p>
          )}
        </div>
        <ul className={styles.stepsList}>
          {stepsItems.map((item, index, array) => (
            <li
              className={styles.stepItem}
              key={index}
              style={{ zIndex: array.length - index }}
            >
              <div className={styles.cardWrapper}>
                <div className={styles.StepsIconWrapper}>
                  <img src={item.image_path} alt="icon" />
                  {isEdit && (
                    <button className={styles.stepsUploadIconBtn}>
                      <DownloadIcon />
                    </button>
                  )}
                </div>
                <div className={styles.StepsCardTitleWrapper}>
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
                <div className={styles.stepsTextWrapper}>
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
                <div className={styles.stepNumberWrapper}>
                  <span className={styles.step}>step</span>
                  <span className={styles.number}>{`0${index + 1}`}</span>
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
              {stepsItems.length === index + 1 &&
                stepsItems.length <= 4 &&
                isEdit && (
                  <button
                    className={styles.addItemBtn}
                    onClick={handleAddLearnItem}
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
          <DisplayOffIcon onClick={() => setShowSteps((prev) => !prev)} />
        </button>
      )}
    </section>
  );
}
