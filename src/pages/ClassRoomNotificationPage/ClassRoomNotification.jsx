import React, { useState } from "react";
import { Typography, Slider } from "antd";
import styles from "./ClassRoomNotification.module.scss";

const { Paragraph } = Typography;

const ClassRoomNotification = () => {
  const [singleValue, setSingleValue] = useState(100);
  const [rangeValue, setRangeValue] = useState([100, 120]);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "24rem",
          padding: "16rem",
          justifyContent: "center",
        }}
      >
        <div>
          <Paragraph>
            Дефолтний слайдер{" "}
            {"(для, наприклад, встоновлення вартості питання в тесті)"}
          </Paragraph>
          <Slider
            onChange={(value) => setSingleValue(value)}
            defaultValue={100}
            min={0}
            max={200}
          />
          <Paragraph>{singleValue}</Paragraph>
        </div>
        <div>
          <Paragraph>
            Слайдер з вибором діапазону{" "}
            {"для фільтрації по оцінкам, наприклад, від 160 до 175"}
          </Paragraph>
          <Slider
            range
            onChange={(value) => setRangeValue(value)}
            defaultValue={[100, 120]}
            min={0}
            max={200}
          />
          <Paragraph>{rangeValue.join(" ")}</Paragraph>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default ClassRoomNotification;
