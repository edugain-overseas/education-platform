import React, { useState } from "react";
import ProgramList from "./ProgramList/ProgramList/ProgramList";

export default function SectionProgram({
  styles,
  data,
  setProgramSectionData,
}) {
  console.log(data);
  const [programTitle, setProgramTitle] = useState(data.section_title);
  const [programDesc, setProgramDesc] = useState(data.section_description);

  const handleTitleChange = (e) => {
    setProgramTitle(e.target.value);
    setProgramSectionData((prev) => ({
      ...prev,
      section_title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setProgramDesc(e.target.value);
    setProgramSectionData((prev) => ({
      ...prev,
      section_description: e.target.value,
    }));
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.toLearnTitleWrapper}>
          <h2>{programTitle}</h2>
          <input
            type="text"
            onChange={handleTitleChange}
            value={programTitle}
          />
        </div>
        <div className={styles.toLearnDescWrapper}>
          <p className={styles.toLearnDesc}>{programDesc}</p>
          <textarea
            type="text"
            rows={2}
            value={programDesc}
            onChange={handleDescriptionChange}
          />
        </div>
        <ProgramList
          listData={data.section_items}
          setProgramSectionData={setProgramSectionData}
        />
      </div>
    </section>
  );
}
