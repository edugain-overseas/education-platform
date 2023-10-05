import React from "react";
import ModuleItem from "./ModuleItem/ModuleItem";
import styles from "./ModulesList.module.scss";

export default function ModulesList({ modules }) {
  return (
    <div className={styles.modulesListWrapper}>
      {modules && (
        <ul className={styles.modulesList}>
          {modules.map((module) => (
            <ModuleItem key={module.module_id} module={module} />
          ))}
        </ul>
      )}
    </div>
  );
}
