import React, { useState } from "react";
import { Select as AntSelect, Checkbox } from "antd";
import { ReactComponent as EditIcon } from "../../../../images/icons/edit.svg";
import { ReactComponent as SubmitIcon } from "../../../../images/icons/check.svg";
import { ReactComponent as CancelIcon } from "../../../../images/icons/cross.svg";
import "./Select.css";

export default function Select({ state, onChange, options, canEdit = false }) {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [newValue, setNewValue] = useState(null);
  const [isEdit, setisEdit] = useState(false);

  // const handleClick = () => {
  //   if (isDropdownOpen) {
  //     setDropdownOpen(false);
  //     return;
  //   }
  //   setDropdownOpen(true);
  // };

  const dropdownRender = () => (
    <div className="selectDropdownWrapper">
      {options?.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          checked={state?.value === option.value}
          onChange={() => {
            onChange(option);
            // setDropdownOpen(false);
          }}
        >
          {option.label}
        </Checkbox>
      ))}
      {canEdit && (
        <Checkbox
          key="new value"
          value={newValue}
          checked={false}
          disabled={true}
          onChange={() => {
            onChange({ value: newValue, label: newValue });
            // setDropdownOpen(false);
          }}
        >
          <div className="inputWrapper">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              disabled={!isEdit}
              className="dropdownInput"
            />
            {isEdit ? (
              <>
                <button type="button">
                  <SubmitIcon onClick={()=>setisEdit(false)}/>
                </button>
                <button type="button">
                  <CancelIcon />
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setisEdit(true)}>
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
      placeholder="Select subject"
      className="select"
      listHeight={190}
      dropdownRender={dropdownRender}
      // open={isDropdownOpen}
      // onClick={handleClick}
    />
  );
}
