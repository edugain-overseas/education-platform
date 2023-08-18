import React, { useEffect, useState } from "react";
import ProgramList from "./ProgramList/ProgramList/ProgramList";
import { ReactComponent as DisplayOffIcon } from "../../images/icons/displayOff.svg";

export default function SectionProgram({
  styles,
  data,
  setProgramSectionData,
}) {
  const [programTitle, setProgramTitle] = useState(data.section_title);
  const [programDesc, setProgramDesc] = useState(data.section_description);
  const [showProgram, setShowProgram] = useState(data.section_display);

  useEffect(() => {
    setProgramSectionData((prev) => ({ ...prev, section_display: showProgram }));
  }, [showProgram, setProgramSectionData]);

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
    <section className={styles.program}>
      <div
        className={styles.container}
        style={{ display: showProgram ? "block" : "none" }}
      >
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
      <button className={styles.displayBtn}>
        <DisplayOffIcon onClick={() => setShowProgram((prev) => !prev)} />
      </button>
    </section>
  );
}
