import React, { useRef, useState } from "react";
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
  disabled = false,
  disabledSlots = null,
}) {
  const [newValue, setNewValue] = useState("");
  const [isEdit, setEdit] = useState(false);
  const inputRef = useRef(null);

  const getIsDisabled = (option) => {
    if (
      type === "time" &&
      disabledSlots.find((slot) => slot === option.label)
    ) {
      return true;
    }
    return false;
  };

  const handleEdit = () => {
    console.log(type, state);
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const dropdownRender = () => (
    <div className="selectDropdownWrapper">
      {options?.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          checked={state?.value === option.value}
          disabled={getIsDisabled(option)}
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
          disabled={newValue === "" || isEdit}
          onChange={() => {
            onChange({ value: newValue, label: newValue });
          }}
        >
          <div className="inputWrapper">
            {isEdit ? (
              <input
                ref={inputRef}
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                disabled={!isEdit}
                className="dropdownInput"
                autoFocus={isEdit}
              />
            ) : (
              newValue
            )}

            {isEdit ? (
              <>
                <button
                  type="button"
                  className="submitBtn"
                  onClick={handleSave}
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
              <button type="button" onClick={handleEdit} className="editBtn">
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
      disabled={disabled}
    />
  );
}
