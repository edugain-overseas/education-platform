import React from "react";
import SectionItems from "./SectionItems";
import SectionSteps from "./SectionSteps";
import SectionProgram from "./SectionProgram";

export default function CoursePageConstructor({ styles }) {
  const programData = [
    {
      title: "Title1",
      items: [
        {
          text: "text1",
        },
        {
          text: "text2",
        },
        {
          text: "text3",
        },
        {
          text: "text4",
        },
      ],
    },
    {
      title: "Title2",
      items: [
        {
          text: "text1",
        },
        {
          text: "text2",
        },
        {
          text: "text3",
        },
      ],
    },
    {
      title: "ExamTitle",
    },
  ];

  return (
    <div>
      <SectionItems styles={styles} />
      <SectionSteps styles={styles} />
      <SectionProgram styles={styles} data={programData}/>
      <section className={styles.teachers}></section>
    </div>
  );
}
