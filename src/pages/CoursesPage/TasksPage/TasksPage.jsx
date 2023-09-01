import React from "react";
import styles from "./TasksPage.module.scss";
import { Outlet } from "react-router-dom";

export default function TasksPage() {
  return (
    <div className={styles.pageMainWrapper}>
      <Outlet />
    </div>
  );
}
