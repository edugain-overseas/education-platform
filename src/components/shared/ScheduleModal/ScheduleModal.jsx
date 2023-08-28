import React, { useState } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/en_GB";
import { Modal, ConfigProvider } from "antd";
import styles from "./ScheduleModal.module.scss";
import DatePicker from "./DatePicker/DatePicker";
import Select from "./Select/Select";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function ScheduleModal({ isOpen, onClose }) {
  const today = dayjs();
  const [date, setDate] = useState(today);

  const onDateChange = (value) => {
    setDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date.format("YYYY-MM-DD"));
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width="1080rem"
      style={{ height: "504rem" }}
      destroyOnClose={true}
      footer={null}
      className={`${styles.modalWrapper}`}
    >
      <h2>add lesson</h2>
      <form onSubmit={handleSubmit}>
        <ConfigProvider locale={locale}>
          <DatePicker date={date} onDateChange={onDateChange} />
          <Select />
        </ConfigProvider>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
