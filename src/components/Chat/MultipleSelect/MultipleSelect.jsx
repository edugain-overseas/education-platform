import React, { useState } from "react";
import { Select, Checkbox } from "antd";
import styles from "./MultipleSelect.module.scss";
import { useSelector } from "react-redux";
import { getParticipantsData } from "../../../redux/chat/chatSelectors";
import { getUserId } from "../../../redux/user/userSelectors";

// const options = [
//   { label: "Student 1aaaaaaaaaaaaaaaaaaaaaa", value: "option1" },
//   { label: "Student 2", value: "option2" },
//   { label: "Student 3", value: "option3" },
//   { label: "Student 4", value: "option4" },
//   { label: "Student 5", value: "option5" },
//   { label: "Student 6", value: "option6" },
//   { label: "Student 7", value: "option7" },
//   { label: "Student 8", value: "option8" },
//   { label: "Student 9", value: "option9" },
//   { label: "Student 10", value: "option10" },
//   { label: "Student 11", value: "option11" },
// ];

export function MultipleSelect({ onChange }) {
  const myId = useSelector(getUserId);
  const options =
    useSelector(getParticipantsData)?.filter(user => user.user_id !== myId).map((user) => ({
      label: `${user.name} ${user.surname}`,
      value: user.user_id,
    })) || [];
  const allOption = { label: "Send All", value: "all" };
  const allOptions = [allOption, ...options];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChangeCheckbox = (value, checked) => {
    const updatedOptions = [...selectedOptions];
    if (checked) {
      updatedOptions.push(value);
    } else {
      const index = updatedOptions.indexOf(value);
      if (index !== -1) {
        updatedOptions.splice(index, 1);
      }
    }
    console.log(updatedOptions);
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleSendAll = (e) => {
    if (e.target.checked) {
      setSelectedOptions(options.map((option) => option.value));
      onChange(options.map((option) => option.value));
    } else {
      setSelectedOptions([]);
    }
  };

  const handleClear = () => {
    console.log("clear");
    setSelectedOptions([]);
    onChange([]);
  };

  const dropdownRender = (menu) => (
    <div className={styles.customDropdown}>
      <div className={styles.customOption}>
        <Checkbox
          value={allOption.value}
          onChange={handleSendAll}
          checked={selectedOptions.length === options.length}
        >
          Send all
        </Checkbox>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={(e) =>
              handleOptionChangeCheckbox(option.value, e.target.checked)
            }
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );

  return (
    <Select
      mode="multiple"
      value={selectedOptions.length === options.length ? [] : selectedOptions}
      options={allOptions}
      defaultValue={"all"}
      dropdownRender={dropdownRender}
      showSearch={false}
      allowClear={true}
      onClear={handleClear}
      maxTagCount={0}
      className={styles.select}
      listHeight="170px"
      bordered={false}
      placeholder="Send all"
      popupMatchSelectWidth={false}
      virtual={false}
    />
  );
}
