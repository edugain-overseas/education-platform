import { Checkbox } from "antd";
import React from "react";

const BooleanCheckbox = ({ setValue, value, label, disabled, styles, show }) => {
  return (
    <div
      className={styles.checkboxWrapper}
      style={{ display: show ? "inline-flex" : "none" }}
    >
      <Checkbox
        onChange={() => setValue((prev) => !prev)}
        className={styles.checkbox}
        disabled={disabled}
        checked={value}
      >
        {label}
      </Checkbox>
    </div>
  );
};

export default BooleanCheckbox;
