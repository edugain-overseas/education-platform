import React from "react";
import LessonsCardList from "./LessonsCardList/LessonsCardList";
import { Collapse } from "antd";
import styles from "./ModuleItem.module.scss";

export default function ModuleItem({ module }) {
  const item = [
    {
      key: module.module_id,
      label: (
        <div className={styles.moduleTitleWrapper}>
          <h3 className={styles.moduleTitle}>
            <span>Module {module.module_number}: </span>
            {module.module_name}
          </h3>
          <p className={styles.moduleDescription}>
            Description: {module.module_desc}
          </p>
        </div>
      ),
      children: module.module_lessons && (
        <LessonsCardList lessons={module.module_lessons} />
      ),
      showArrow: false,
    },
  ];

  return (
    <li className={styles.moduleItem}>
      <p className={styles.moduleSimestr}>1 cours - 1 simestr</p>
      <Collapse
        defaultActiveKey={module.module_id}
        items={item}
        ghost={true}
        className={styles.antCollapse}
      />
    </li>
  );
}
