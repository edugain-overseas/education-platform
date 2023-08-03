import React from "react";
import SubjectInfoPanel from "../../../../components/SubjectInfoPanel/SubjectInfoPanel";
import styles from "./CourseTapesPage.module.scss";
import { Chat } from "../../../../components/Chat/Chat";
import ProgressPanel from "../../../../components/ProgressPanel/ProgressPanel";

export default function CourseTapesPage() {
  return (
    <div className={styles.pageWrapper}>
      <SubjectInfoPanel />
      <Chat />
      <ProgressPanel />
    </div>
  );
}
