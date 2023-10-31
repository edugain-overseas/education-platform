import React, { useRef, useState } from "react";
import { Select as AntSelect, Checkbox } from "antd";
import { ReactComponent as EditIcon } from "../../../../images/icons/edit.svg";
import { ReactComponent as SubmitIcon } from "../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../images/icons/cross.svg";
import "./Select.css";
import { useDispatch } from "react-redux";
import { addNewModuleThunk } from "../../../../redux/subject/subjectOperations";
import { useSelector } from "react-redux";
import { getSubjectData } from "../../../../redux/subject/subjectSelectors";

export default function Select({
  type,
  state,
  onChange,
  options,
  canEdit = false,
  error = false,
  disabled = false,
  disabledSlots = null,
  subjectId = null,
}) {
  const [newValue, setNewValue] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [created, setCreated] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const subjectModules = useSelector(getSubjectData).find(
    (subject) => +subject.id === +subjectId
  )?.subjects_lessons;

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
    if (type === "module title") {
      console.log(subjectId);
      if (newValue === "") {
        return;
      }
      const newModule = {
        number: subjectModules.length + 1,
        name: newValue,
        subject_id: subjectId,
      };
      dispatch(addNewModuleThunk(newModule)).then(({ payload }) => {
        onChange({ value: payload.id, label: payload.name });
        setCreated(true);
      });
      setNewValue("");
    }
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
      {canEdit && !created && (
        <Checkbox
          key="new value"
          value={newValue}
          checked={state?.value === newValue}
          disabled={newValue === "" || isEdit}
          onChange={
            type === "module title"
              ? () => {}
              : () => {
                  onChange({ value: newValue, label: newValue });
                }
          }
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
