import React, { useState } from "react";
import { Select as AntSelect, Checkbox } from "antd";
import { ReactComponent as EditIcon } from "../../../../images/icons/edit.svg";
import { ReactComponent as SubmitIcon } from "../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../images/icons/cross.svg";
import "./Select.css";

export default function Select({
  type,
  state,
  onChange,
  options,
  canEdit = false,
  error = false,
}) {
  const [newValue, setNewValue] = useState("");
  const [isEdit, setEdit] = useState(false);

  const dropdownRender = () => (
    <div className="selectDropdownWrapper">
      {options?.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          checked={state?.value === option.value}
          onChange={() => {
            onChange(option);
          }}
        >
          {option.label}
        </Checkbox>
      ))}
      {canEdit && (
        <Checkbox
          key="new value"
          value={newValue}
          checked={state?.value === newValue}
          disabled={newValue === ""}
          onChange={() => {
            onChange({ value: newValue, label: newValue });
          }}
        >
          <div className="inputWrapper">
            {isEdit ? (
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                disabled={!isEdit}
                className="dropdownInput"
              />
            ) : (
              newValue
            )}

            {isEdit ? (
              <>
                <button
                  type="button"
                  className="submitBtn"
                  onClick={() => setEdit(false)}
                >
                  <SubmitIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewValue("");
                    setEdit(false);
                  }}
                  className="cancelBtn"
                >
                  <CancelIcon />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="editBtn"
              >
                <EditIcon />
              </button>
            )}
          </div>
        </Checkbox>
      )}
    </div>
  );

  return (
    <AntSelect
      value={state?.label || null}
      placeholder={`Select ${type}`}
      className="select"
      status={error && "error"}
      listHeight={190}
      dropdownRender={dropdownRender}
      onChange={(value) => console.log(value)}
    />
  );
}
