import React, { useState } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/en_GB";
import {
  Button,
  Drawer,
  InputNumber,
  ConfigProvider,
  TimePicker,
  Divider,
  Checkbox,
} from "antd";
import { ReactComponent as SettingIcon } from "../../../../images/icons/settings.svg";
import DatePicker from "../../../shared/LessonAddModal/DatePicker/DatePicker";
import styles from "./TestSettings.module.scss";
import "./Drawer.css";
import { useDispatch } from "react-redux";
import { createTestThunk } from "../../../../redux/task/taskOperation";
import { useParams } from "react-router-dom";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const timeFormat = "HH:mm";

const TestSettings = ({ config = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minScore, setMinScore] = useState(config?.minScore || 0);
  const [numberOfAttemps, setNumberOfAttemps] = useState(config?.attempts || 0);
  const [deadlineDate, setDeadlineDate] = useState(
    dayjs(config?.deadline) || null
  );
  const [deadlineTime, setDeadlineTime] = useState(
    dayjs(config?.deadline) || null
  );
  const [isTimer, setIsTimer] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isShuffle, setIsShuffle] = useState(config.shuffleAnswer);
  const [isPublished, setIsPublished] = useState(config.isPublished);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { testId } = config;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleReset = () => {
    setMinScore(config?.minScore || 0);
    setNumberOfAttemps(config?.attempts || 0);
  };

  const handleSubmit = () => {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "hh:mm";
    const config = {
      is_published: isPublished,
      min_score: minScore,
      set_timer: isTimer,
      timer: timer ? `${timer.format(timeFormat)}` : null,
      attempts: numberOfAttemps,
      shuffle_answer: isShuffle,
      deadline: deadlineDate
        ? `${deadlineDate?.format(dateFormat)}T${
            deadlineTime ? deadlineTime.format(timeFormat) : ""
          }`
        : null,
      lesson_id: +lessonId,
    };

    setIsLoading(true);
    dispatch(createTestThunk(config))
      .then(() => setIsOpen(false))
      .finally(() => setIsLoading(true));
  };

  const onDateChange = (value) => {
    setDeadlineDate(value);
  };

  const onTimeChange = (value) => {
    setDeadlineTime(value);
    console.log(value.format("hh:mm"));
  };

  const handleSetTimer = () => {
    setIsTimer((prev) => {
      if (prev) {
        setTimer(null);
      }
      return !prev;
    });
  };

  const handleShuffleAnswers = () => {
    setIsShuffle((prev) => !prev);
  };

  return (
    <>
      <button
        className={
          !testId
            ? `${styles.primaryColorBtn} ${styles.pulsing}`
            : styles.primaryColorBtn
        }
        onClick={handleOpen}
      >
        <span className={styles.btnLabelWhite}>Setting test</span>
        <SettingIcon />
      </button>
      <Drawer
        title={<h3 className={styles.headerTitle}>Test Settings</h3>}
        onClose={handleClose}
        open={isOpen}
        width={400}
        style={{ padding: 0 }}
        classNames={{ mask: "mask", wrapper: "wrapper" }}
        footer={
          <div className={styles.headerBtnsWrapper}>
            <Button onClick={handleReset}>Reset</Button>
            <Button type="primary" onClick={handleSubmit} loading={isLoading}>
              Sumbit
            </Button>
          </div>
        }
      >
        <div className={styles.formWrapper}>
          <ConfigProvider locale={locale}>
            <DatePicker
              date={deadlineDate}
              onDateChange={onDateChange}
              placeholder="Select deadline date"
              className={styles.deadlineDatePicker}
            />
            <TimePicker
              format={timeFormat}
              value={deadlineTime}
              onSelect={onTimeChange}
              inputReadOnly
              placeholder="Select deadline time"
              allowClear={false}
              className={styles.deadlineTimePicker}
              disabled={!deadlineDate}
            />
            <Divider className={styles.divider} />
            <InputNumber
              min={0}
              max={200}
              step={5}
              defaultValue={0}
              className={styles.minScore}
              addonBefore={
                <span className={styles.addonBeforeNumber}>
                  Threshold for passing the test
                </span>
              }
              onChange={(value) => setMinScore(value)}
              value={minScore}
            />
            <InputNumber
              min={0}
              max={10}
              step={1}
              defaultValue={1}
              className={styles.attempsNumber}
              addonBefore={
                <span className={styles.addonBeforeNumber}>
                  Number of attempts
                </span>
              }
              onChange={(value) => setNumberOfAttemps(value)}
              value={numberOfAttemps}
            />
            <Divider className={styles.divider} />
            <Checkbox
              onChange={handleSetTimer}
              className={styles.setTimerCheckbox}
            >
              <span>Set timer</span>
            </Checkbox>
            <TimePicker
              format={timeFormat}
              value={timer}
              onSelect={(value) => setTimer(value)}
              inputReadOnly
              allowClear={false}
              className={styles.timerPicker}
              disabled={!isTimer}
              minuteStep={10}
            />
            <Divider className={styles.divider} />
            <Checkbox
              onChange={handleShuffleAnswers}
              className={styles.setTimerCheckbox}
              checked={isShuffle}
            >
              <span>Shuffle answers</span>
            </Checkbox>
            <Divider className={styles.divider} />
            <Checkbox
              onChange={() => setIsPublished((prev) => !prev)}
              className={styles.publishedCheckbox}
              checked={isPublished}
            >
              <span>Published</span>
            </Checkbox>
          </ConfigProvider>
        </div>
      </Drawer>
    </>
  );
};

export default TestSettings;
