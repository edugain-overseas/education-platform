import React from "react";
import SectionItems from "./SectionItems";
import SectionSteps from "./SectionSteps";
import SectionProgram from "./SectionProgram";

export default function CoursePageConstructor({ styles }) {
  return (
    <div>
      <SectionItems styles={styles} />
      <SectionSteps styles={styles} />
      <SectionProgram styles={styles} />
      <section className={styles.teachers}></section>
    </div>
  );
}
