import React from "react";
import dayjs from "dayjs";
import { DatePicker as AntDatePicker } from "antd";
import "./DatePicker.css";

export default function DatePicker({ date, onDateChange }) {
  const today = dayjs();
  const dateFormat = "DD.MM.YY (dddd)";
  const disabledDate = (currentDate) => {
    const dayOfWeek = currentDate.day();
    return (
      dayOfWeek === 0 || dayOfWeek === 6 || currentDate.isBefore(today, "day")
    );
  };
  return (
    <AntDatePicker
      value={date}
      onChange={onDateChange}
      popupClassName="datePickerDropdownWrapper"
      inputReadOnly={true}
      disabledDate={disabledDate}
      format={dateFormat}
      className="datePicker"
    />
  );
}
