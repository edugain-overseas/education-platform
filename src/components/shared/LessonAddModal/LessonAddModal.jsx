import React, { useState } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/en_GB";
import { Modal, ConfigProvider, message } from "antd";
import DatePicker from "./DatePicker/DatePicker";
import Select from "./Select/Select";
import { lessonTimeSlots } from "../../../constants/lessonTimeSlots";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../redux/subject/subjectSelectors";
import {
  getTeacherId,
  getTeacherSubjects,
} from "../../../redux/user/userSelectors";
import { lessonTypes } from "../../../constants/lessonTypes";
import { useDispatch } from "react-redux";
import {
  addNewLessonThunk,
  getSubjectTapesByIdThunk,
} from "../../../redux/subject/subjectOperations";
import { getTeacherScheduleThunk } from "../../../redux/schedule/scheduleOperations";
import styles from "./LessonAddModal.module.scss";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function ScheduleModal({
  isOpen,
  onClose,
  day = "",
  disabledSlots = [],
}) {
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
  const dispatch = useDispatch();

  const subjectData = useSelector(getSubjectData);
  const subjectsMetaData = useSelector(getTeacherSubjects) || [];
  const teacherId = useSelector(getTeacherId);

  const subjectOptions = subjectsMetaData.map(
    ({ subject_id, subject_title }) => ({
      value: subject_id,
      label: subject_title,
    })
  );

  const teacherOptions =
    subjectData
      .find(({ id }) => id === subject?.value)
      ?.subject_teachers.map(({ id, name, surname }) => ({
        value: id,
        label: `${name} ${surname}`,
      })) || null;

  const lessonTypeOptions = lessonTypes.map((type) => ({
    value: type,
    label: type.replaceAll("_", " "),
  }));

  const groupOptions = subjectsMetaData.reduce(
    (acc, { group_id, group_name }) => {
      const isUnique = !acc.some(({ value }) => value === group_id);
      if (isUnique) {
        acc.push({ value: group_id, label: group_name });
      }
      return acc;
    },
    []
  );
  const moduleTitleOptions = subjectData
    .find((subjectItem) => +subjectItem.id === +subject?.value)
    ?.subjects_lessons.map(({ module_id, module_name }) => ({
      value: module_id,
      label: module_name,
    }));

  const moduleDescriptionOptions = subjectData
    .find((subjectItem) => +subjectItem.id === +subject?.value)
    ?.subjects_lessons.map(({ module_id, module_desc }) => ({
      value: module_id,
      label: module_desc,
    }));

  const lessonTitleOptions = subjectData
    .find((subjectItem) => +subjectItem.id === +subject?.value)
    ?.subjects_lessons.find(
      ({ module_id }) => +module_id === +moduleTitle?.value
    )
    ?.module_lessons.map(({ lesson_id, lesson_title }) => ({
      value: lesson_id,
      label: lesson_title,
    }));

  const lessonDescriptionOptions = subjectData
    .find((subjectItem) => +subjectItem.id === +subject?.value)
    ?.subjects_lessons.find(
      ({ module_id }) => +module_id === +moduleTitle?.value
    )
    ?.module_lessons.map(({ lesson_id, lesson_desc }) => ({
      value: lesson_id,
      label: lesson_desc,
    }));

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

    const moduleLessonsLength = subjectData
      .find((subjectItem) => +subjectItem.id === +subject?.value)
      ?.subjects_lessons.find(
        ({ module_id }) => +module_id === +moduleTitle?.value
      )?.module_lessons.length;

    const newLesson = {
      number: +moduleLessonsLength + 1,
      title: lessonTitle.label,
      description: lessonDescription?.label || "",
      is_published: true,
      lesson_date: `${date.format("YYYY-MM-DD")}T${timeStart}:00`,
      lesson_end: `${timeEnd}:00`,
      lesson_type: lessonType.value,
      module_id: moduleTitle.value,
      subject_id: subject.value,
      teacher_id: teacher.value,
    };
    dispatch(
      addNewLessonThunk({ subjectId: subject.value, data: newLesson })
    ).then(() => {
      dispatch(getTeacherScheduleThunk(teacherId));
      dispatch(getSubjectTapesByIdThunk(subject.value));
      onClose();
    });
    console.log(newLesson);
  };

  console.log();
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
              day={day}
            />
            <Select
              type="time"
              state={time}
              onChange={onTimeChange}
              options={lessonTimeSlots}
              error={validate && !time}
              disabledSlots={disabledSlots}
            />
            <Select
              type="subject"
              state={subject}
              onChange={onSubjectChange}
              options={subjectOptions}
              error={validate && !subject}
            />
            <Select
              type="lesson type"
              state={lessonType}
              onChange={onLessonTypeChange}
              options={lessonTypeOptions}
              error={validate && !lessonType}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="group"
              state={group}
              onChange={onGroupChange}
              options={groupOptions}
              error={validate && !group}
            />
            <Select
              type="teacher"
              state={teacher}
              onChange={onTeacherChange}
              options={teacherOptions}
              error={validate && !teacher}
              disabled={!teacherOptions ? true : false}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="module title"
              state={moduleTitle}
              onChange={onModuleTitleChange}
              options={moduleTitleOptions}
              canEdit={true}
              error={validate && !moduleTitle}
              disabled={!moduleTitleOptions ? true : false}
              subjectId={subject?.value}
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="module description"
              state={moduleDescription}
              onChange={onModuleDescriptionChange}
              options={moduleDescriptionOptions && moduleDescriptionOptions}
              canEdit={true}
              disabled={
                !moduleDescriptionOptions || !moduleTitle ? true : false
              }
            />
          </div>
          <div className={styles.formRow}>
            <Select
              type="lesson title"
              state={lessonTitle}
              onChange={onLessonTitleChange}
              options={lessonTitleOptions}
              canEdit={true}
              error={validate && !lessonTitle}
              disabled={!lessonTitleOptions ? true : false}
            />
            <Select
              type="lesson description"
              state={lessonDescription}
              onChange={onLessonDescriptionChange}
              options={lessonDescriptionOptions}
              canEdit={true}
              disabled={!lessonDescriptionOptions ? true : false}
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
