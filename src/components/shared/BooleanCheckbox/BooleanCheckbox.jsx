import { Checkbox } from "antd";
import React from "react";

const BooleanCheckbox = ({ setValue, label, disabled, styles, show }) => {
  return (
    <div
      className={styles.checkboxWrapper}
      style={{ display: show ? "inline-flex" : "none" }}
    >
      <Checkbox
        onChange={() => setValue((prev) => !prev)}
        className={styles.checkbox}
        disabled={disabled}
      >
        {label}
      </Checkbox>
    </div>
  );
};

export default BooleanCheckbox;
