import React, { useState } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/en_GB";
import { Modal, ConfigProvider, message } from "antd";
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
  const [date, setDate] = useState(null);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [group, setGroup] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [moduleTitle, setModuleTitle] = useState(null);
  const [moduleDescription, setModuleDescription] = useState(null);
  const [lessonTitle, setLessonTitle] = useState(null);
  const [lessonDescription, setLessonDescription] = useState(null);
  const [validate, setValidate] = useState(false);

  const getIsValidateError = () =>
    !date ||
    !subject ||
    !time ||
    !lessonType ||
    !group ||
    !teacher ||
    !moduleTitle ||
    !lessonTitle;

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

    if (getIsValidateError()) {
      setValidate(true);
      message.error("Please fill required fields");
      return;
    }

    const timeStart = time.label.split(" - ")[0];
    const timeEnd = time.label.split(" - ")[1];

    const newLesson = {
      number: 1,
      title: lessonTitle.value,
      description: lessonDescription.value,
      is_published: true,
      lesson_date: `${date.format("YYYY-MM-DD")}T${timeStart}:00`,
      lesson_end: `${timeEnd}:00`,
      lesson_type_id: lessonType.value,
      module_id: moduleTitle.value,
      subject_id: subject.value,
      teacher_id: teacher.value,
    };

    console.log(newLesson);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width="1080rem"
      destroyOnClose={true}
      footer={null}
      className={`${styles.modalWrapper}`}
      maskStyle={{
        background: "rgba(0,0,0,0.62)",
        backdropFilter: "blur(4rem)",
        boxShadow: "0 0 4rem 0 rgba(0, 0, 0, 0.12)",
      }}
    >
      <h2 className={styles.modalTitle}>add lesson</h2>
      <form onSubmit={handleSubmit} className={styles.modalForm}>
        <ConfigProvider locale={locale}>
          <div className={styles.formRow}>
            <DatePicker
              date={date}
              onDateChange={onDateChange}
              error={validate && !date}
            />
            <Select
              type="subject"
              state={subject}
              onChange={onSubjectChange}
              options={options}
              error={validate && !subject}
            />
            <Select
              type="time"
              state={time}
              onChange={onTimeChange}
              options={lessonTimeSlots}
              error={validate && !time}
            />
            <Select
              type="lesson type"
              state={lessonType}
              onChange={onLessonTypeChange}
              options={options}
              error={validate && !lessonType}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="group"
              state={group}
              onChange={onGroupChange}
              options={options}
              error={validate && !group}
            />
            <Select
              type="teacher"
              state={teacher}
              onChange={onTeacherChange}
              options={options}
              error={validate && !teacher}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="module title"
              state={moduleTitle}
              onChange={onModuleTitleChange}
              options={options}
              canEdit={true}
              error={validate && !moduleTitle}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="module description"
              state={moduleDescription}
              onChange={onModuleDescriptionChange}
              options={options}
              canEdit={true}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="lesson title"
              state={lessonTitle}
              onChange={onLessonTitleChange}
              options={options}
              canEdit={true}
              error={validate && !lessonTitle}
            />
            <Select
              type="lesson description"
              state={lessonDescription}
              onChange={onLessonDescriptionChange}
              options={options}
              canEdit={true}
            />
          </div>
        </ConfigProvider>
        <button
          type="submit"
          className={styles.modalFormSubmitBtn}
          disabled={getIsValidateError()}
        >
          Add schedule +
        </button>
      </form>
    </Modal>
  );
}
