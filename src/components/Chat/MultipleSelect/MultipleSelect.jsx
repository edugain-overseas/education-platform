import React, { useState } from "react";
import { Select, Checkbox } from "antd";
import styles from "./MultipleSelect.module.scss";

export function MultipleSelect() {
  const options = [
    { label: "Student 1aaaaaaaaaaaaaaaaaaaaaa", value: "option1" },
    { label: "Student 2", value: "option2" },
    { label: "Student 3", value: "option3" },
    { label: "Student 4", value: "option4" },
    { label: "Student 5", value: "option5" },
    { label: "Student 6", value: "option6" },
    { label: "Student 7", value: "option7" },
    { label: "Student 8", value: "option8" },
    { label: "Student 9", value: "option9" },
    { label: "Student 10", value: "option10" },
    { label: "Student 11", value: "option11" },
  ];
  const allOption = { label: "Send All", value: "all" };
  const allOptions = [allOption, ...options];
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [isScrolling, setIsScrolling] = useState(true);
  // const scrollTimerRef = useRef(null);

  const handleOptionChange = (values) => {
    if (values.includes("all")) {
      setSelectedOptions(options.map((option) => option.value));
    } else {
      setSelectedOptions(values);
    }
  };

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
  };

  const handleSendAll = (e) => {
    if (e.target.checked) {
      setSelectedOptions(options.map((option) => option.value));
    } else {
      setSelectedOptions([]);
    }
  };

  // const choiceRender = (choice) => {
  //   if (choice.value === "all") {
  //     return "Send all";
  //   }
  //   return choice.label;
  // };

  // const handleScrollStart = () => {
  //   setIsScrolling(true);
  //   setIsScrolling(false)
  //   // clearTimeout(scrollTimerRef.current);
  //   console.log('asdasd');
  //   // scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 500);
  // };

  const dropdownRender = (menu) => (
    <div
      className={styles.customDropdown}
      // style={{ overflowY: isScrolling ? 'auto' : 'hidden' }}
      // onScroll={handleScrollStart}
    >
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
      onChange={handleOptionChange}
      options={allOptions}
      defaultValue={"all"}
      dropdownRender={dropdownRender}
      showSearch={false}
      allowClear
      maxTagCount={0}
      className={styles.select}
      listHeight="170px"
      bordered={false}
      placeholder="Send all"
      popupMatchSelectWidth={false}
      virtual={false}
      // choiceRender={choiceRender}
    />
  );
}
