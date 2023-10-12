import React, { useState } from "react";
import { Select, Checkbox } from "antd";
import styles from "./MultipleSelect.module.scss";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/userSelectors";

export function MultipleSelect({ onChange, chatData }) {
  const myId = useSelector(getUserId);
  const options =
    chatData?.participantsData
      ?.filter((user) => user.userId !== myId)
      .map((user) => ({
        label: `${user.name} ${user.surname}`,
        value: user.userId,
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
      listHeight="170rem"
      bordered={false}
      placeholder="Send all"
      popupMatchSelectWidth={false}
      virtual={false}
    />
  );
}
