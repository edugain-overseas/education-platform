import React, { useState } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/en_GB";
import { Modal, ConfigProvider } from "antd";
import DatePicker from "./DatePicker/DatePicker";
import Select from "./Select/Select";
import { lessonTimeSlots } from "../../../constants/lessonTimeSlots";
import styles from "./LessonAddModal.module.scss";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const options = [
  {
    value: "0",
    label: "Jack",
  },
  {
    value: "1",
    label: "Lucy",
  },
  {
    value: "2",
    label: "yiminghe",
  },
  {
    value: "3",
    label: "werwewwwrr",
  },
  {
    value: "4",
    label: "rrrrrrr",
  },
  {
    value: "5",
    label: "yimqwerqwer",
  },
  {
    value: "6",
    label: "yimasdfasdf",
  },
];

export default function ScheduleModal({ isOpen, onClose }) {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [group, setGroup] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [moduleTitle, setModuleTitle] = useState(null);
  const [moduleDescription, setModuleDescription] = useState(null);
  const [lessonTitle, setLessonTitle] = useState(null);
  const [lessonDescription, setLessonDescription] = useState(null);

  const onDateChange = (value) => {
    setDate(value);
  };

  const onSubjectChange = (value) => {
    setSubject(value);
  };

  const onTimeChange = (value) => {
    setTime(value);
  };

  const onLessonTypeChange = (value) => {
    setLessonType(value);
  };
  const onGroupChange = (value) => {
    setGroup(value);
  };

  const onTeacherChange = (value) => {
    setTeacher(value);
  };

  const onModuleTitleChange = (value) => {
    setModuleTitle(value);
  };

  const onModuleDescriptionChange = (value) => {
    setModuleDescription(value);
  };

  const onLessonTitleChange = (value) => {
    setLessonTitle(value);
  };

  const onLessonDescriptionChange = (value) => {
    setLessonDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ date: date.format("YYYY-MM-DD"), subject: subject.value });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width="1080rem"
      destroyOnClose={true}
      footer={null}
      className={`${styles.modalWrapper}`}
    >
      <h2 className={styles.modalTitle}>add lesson</h2>
      <form onSubmit={handleSubmit} className={styles.modalForm}>
        <ConfigProvider locale={locale}>
          <div className={styles.formRow}>
            <DatePicker date={date} onDateChange={onDateChange} />
            <Select
              state={subject}
              onChange={onSubjectChange}
              options={options}
            />
            <Select
              state={time}
              onChange={onTimeChange}
              options={lessonTimeSlots}
            />
            <Select
              state={lessonType}
              onChange={onLessonTypeChange}
              options={options}
            />
          </div>
          <div className={styles.formRow}>
            <Select state={group} onChange={onGroupChange} options={options} />
            <Select
              state={teacher}
              onChange={onTeacherChange}
              options={options}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              state={moduleTitle}
              onChange={onModuleTitleChange}
              options={options}
              canEdit={true}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              state={moduleDescription}
              onChange={onModuleDescriptionChange}
              options={options}
              canEdit={true}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              state={lessonTitle}
              onChange={onLessonTitleChange}
              options={options}
              canEdit={true}
            />
            <Select
              state={lessonDescription}
              onChange={onLessonDescriptionChange}
              options={options}
              canEdit={true}
            />
          </div>
        </ConfigProvider>
        <button type="submit" className={styles.modalFormSubmitBtn}>
          Add schedule +
        </button>
      </form>
    </Modal>
  );
}
