import React, { useState } from "react";
import ProgramList from "./ProgramList/ProgramList";

export default function SectionProgram({ styles }) {
  const [programTitle, setProgramTitle] = useState("Training program");
  const [programDesc, setProgramDesc] = useState("Description");
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.toLearnTitleWrapper}>
          <h2>{programTitle}</h2>
          <input
            type="text"
            onChange={(e) => setProgramTitle(e.target.value)}
            value={programTitle}
          />
        </div>
        <div className={styles.toLearnDescWrapper}>
          <p className={styles.toLearnDesc}>{programDesc}</p>
          <textarea
            type="text"
            rows={2}
            value={programDesc}
            onChange={(e) => setProgramDesc(e.target.value)}
          />
        </div>
        <ProgramList />
      </div>
    </section>
  );
}
