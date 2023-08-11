import React, { useState } from "react";
import { ReactComponent as DownloadIcon } from "../../images/icons/download.svg";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import { ReactComponent as AddItemIcon } from "../../images/icons/addItem.svg";
import MonitorIcon from "../../images/icons/monitor.svg";
// import { ReactComponent as MonitorIcon } from "../../images/icons/monitor.svg";
// import { ReactComponent as DiplomaIcon } from "../../images/icons/diploma.svg";
// import { ReactComponent as KnowledgeIcon } from "../../images/icons/knowledge.svg";

const defaultLearnItem = {
  imagePath: MonitorIcon,
  title: "Item title",
  text: "Item Text",
};

export default function SectionSteps({ styles }) {
  const [stepsTitle, setStepsTitle] = useState("Title");
  const [stepsDescription, setStepsDescription] = useState("Description");
  const [stepsItems, setStepItems] = useState([defaultLearnItem]);
  const [showSteps, setShowSteps] = useState(true);

  const handleLearnInputChange = (index, name, value) => {
    const updatedItems = [...stepsItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    setStepItems(updatedItems);
  };

  const handleAddLearnItem = () => {
    setStepItems([...stepsItems, defaultLearnItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...stepsItems];
    updatedItems.splice(index, 1);

    setStepItems(updatedItems);
  };

  return (
    <section className={styles.toLearnSteps}>
      <div
        className={styles.container}
        style={{ display: showSteps ? "block" : "none" }}
      >
        <div className={styles.toLearnTitleWrapper}>
          <h2>{stepsTitle}</h2>
          <input
            type="text"
            onChange={(e) => setStepsTitle(e.target.value)}
            value={stepsTitle}
          />
        </div>
        <div className={styles.toLearnDescWrapper}>
          <p className={styles.toLearnDesc}>{stepsDescription}</p>
          <textarea
            type="text"
            rows={2}
            value={stepsDescription}
            onChange={(e) => setStepsDescription(e.target.value)}
          />
        </div>
        <ul className={styles.stepsList}>
          {stepsItems.map((item, index, array) => (
            <li className={styles.stepItem} key={index} style={{zIndex: array.length - index}}>
              <div className={styles.cardWrapper}>
                <div className={styles.StepsIconWrapper}>
                  <img src={item.imagePath} alt="icon" />
                  <button className={styles.stepsUploadIconBtn}>
                    <DownloadIcon />
                  </button>
                </div>
                <div className={styles.StepsCardTitleWrapper}>
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
                <div className={styles.stepsTextWrapper}>
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
                <div className={styles.stepNumberWrapper}>
                    <span className={styles.step}>step</span>
                    <span className={styles.number}>{`0${index + 1}`}</span>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteItem(index)}
                >
                  <TrashIcon />
                </button>
              </div>
              {stepsItems.length === index + 1 && stepsItems.length <= 4 && (
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
      <button className={styles.displayBtn}>
        <DisplayOffIcon onClick={() => setShowSteps((prev) => !prev)} />
      </button>
    </section>
  );
}
